/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as core from '@actions/core';
import * as github from '@actions/github';
import type { Context } from '@actions/github/lib/context.js';
import { fetchFile, getGithubContext, getPRDiff } from './utils.js';
import type { FileChange, ReviewComments } from './types.js';
import getPRReviewPrompt from './prompts.js';
import { gemini } from './clients/index.js';
import { ReviewCommentsSchema } from './schemas/gemini.js';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const customInstructionUri = core.getInput('customInstructionUri');
    const apiKey = core.getInput('apiKey', { required: true });
    const model = core.getInput('model');
    const octokit = github.getOctokit(token);
    let customInstructions = null;
    const context: Context = getGithubContext();
    if (!context.payload.pull_request) {
      core.setFailed('This action must run on pull_request events');
      return;
    }
    const prNumber = context.payload.pull_request.number;
    const repo = context.repo;
    const commitId = context.payload.pull_request['head'].sha;
    if (customInstructionUri && customInstructionUri.endsWith('.txt')) {
      // TODO: add a warning when the user provides a customInstructionUri yet it is not of type .txt
      customInstructions = await fetchFile(customInstructionUri);
    }
    const filesChanged: Array<FileChange> = await getPRDiff(
      octokit,
      context.repo.owner,
      context.repo.repo,
      context.payload.pull_request.number,
    );
    const filesChangedStr: string = JSON.stringify(filesChanged);
    const prompt = getPRReviewPrompt(filesChangedStr, customInstructions);
    const geminiClient = gemini.getClient(apiKey);
    const geminiModel = gemini.getModel(model, geminiClient);
    const rawResponse = await gemini.generateResponse(geminiModel, prompt, ReviewCommentsSchema);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: ReviewComments = JSON.parse(rawResponse);
    for (const reviewComment of response.reviewComments) {
      // Build the params object, only including optional properties if defined
      const params: {
        owner: string;
        repo: string;
        pull_number: number;
        commit_id: string;
        path: string;
        line: number;
        side: 'RIGHT' | 'LEFT';
        body: string;
        start_line?: number;
        start_side?: 'RIGHT' | 'LEFT';
      } = {
        owner: repo.owner,
        repo: repo.repo,
        pull_number: prNumber,
        commit_id: commitId,
        path: reviewComment.path,
        line: reviewComment.line,
        side: reviewComment.side,
        body: reviewComment.body,
      };
      if (typeof reviewComment.start_line === 'number') {
        params['start_line'] = reviewComment.start_line;
      }
      if (typeof reviewComment.start_side === 'string') {
        params['start_side'] = reviewComment.start_side;
      }
      await octokit.rest.pulls.createReviewComment(params);
    }
    await octokit.rest.issues.createComment({
      owner: repo.owner,
      repo: repo.repo,
      issue_number: prNumber,
      body: response.summary,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown) {
    core.setFailed((error as { message: string }).message);
  }
}

void run();
