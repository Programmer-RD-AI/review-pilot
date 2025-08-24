/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as core from '@actions/core';
import * as github from '@actions/github';
import type { Context } from '@actions/github/lib/context.js';
import { fetchFile, getGithubContext, getPRDiff } from './utils.js';
import type { FileChange, ReviewComments } from './types.js';
import getPRReviewPrompt from './prompts.js';
import { gemini } from './clients/index.js';
import { ReviewCommentsSchema } from './schemas/gemini.js';
import createReview from './graphql.js';

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
    const prNodeId = context.payload.pull_request['node_id'];
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
    core.info(filesChangedStr);
    core.info(customInstructions ? customInstructionUri : '');
    const prompt = getPRReviewPrompt(filesChangedStr, customInstructions);
    const geminiClient = gemini.getClient(apiKey);
    const geminiModel = gemini.getModel(model, geminiClient);
    core.info(prompt);
    const rawResponse = await gemini.generateResponse(geminiModel, prompt, ReviewCommentsSchema);
    core.info(rawResponse);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: ReviewComments = JSON.parse(rawResponse);
    await createReview(token, prNodeId as string, response.summary, response.comments);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown) {
    core.setFailed((error as { message: string }).message);
  }
}

void run();
