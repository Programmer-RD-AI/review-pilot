/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as core from '@actions/core';
import * as github from '@actions/github';
import type { Context } from '@actions/github/lib/context.js';
import { fetchFile, getGithubContext, getPRDiff, populatePromptTemplate } from './utils.js';
import type { FileChange, ReviewComments } from './types.js';
import { gemini } from './clients/index.js';
import { ReviewCommentsSchema } from './schemas/gemini.js';
import createReview from './api/prReview.js';
import getPrReviewBasePrompt from './prompts/prReviewPrompt.js';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const customInstructionUri = core.getInput('customInstructionUri');
    const apiKey = core.getInput('apiKey', { required: true });
    const model = core.getInput('model');
    const octokit = github.getOctokit(token);
    let customInstructions = null;
    const context: Context = getGithubContext();
    const pr = context.payload.pull_request;
    if (!pr) {
      core.setFailed('This action must run on pull_request events');
      return;
    }
    const prNodeId = pr['node_id'];

    // PR metadata
    const prDescription = pr.body ?? '';

    // Existing comments (conversation)
    const { data: existingCommentsData } = await octokit.rest.issues.listComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: pr.number,
    });
    const existingComments = existingCommentsData.map((c) => ({
      author: c.user?.login,
      body: c.body,
    }));

    // Existing review comments (inline)
    const { data: existingReviewCommentsData } = await octokit.rest.pulls.listReviewComments({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pr.number,
    });
    const existingReviewComments = existingReviewCommentsData.map((c) => ({
      author: c.user?.login,
      body: c.body,
      path: c.path,
      line: c.line,
    }));

    if (customInstructionUri && customInstructionUri.endsWith('.txt')) {
      // TODO: add a warning when the user provides a customInstructionUri yet it is not of type .txt
      customInstructions = await fetchFile(customInstructionUri);
    }
    const filesChanged: Array<FileChange> = await getPRDiff(
      octokit,
      context.repo.owner,
      context.repo.repo,
      pr.number,
    );
    const filesChangedStr: string = JSON.stringify(filesChanged);
    core.info(JSON.stringify(existingComments));
    core.info(JSON.stringify(existingReviewComments));
    const prompt = populatePromptTemplate(getPrReviewBasePrompt(), {
      custom_instructions: customInstructions,
      files_changed: filesChangedStr,
      pr_description: prDescription,
      existing_comments: JSON.stringify(existingComments),
      existing_review_comments: JSON.stringify(existingReviewComments),
    });
    const geminiClient = gemini.getClient(apiKey);
    const geminiModel = gemini.getModel(model, geminiClient);
    const rawResponse = await gemini.generateResponse(geminiModel, prompt, ReviewCommentsSchema);
    core.info(rawResponse);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: ReviewComments = JSON.parse(rawResponse);
    await createReview(
      token,
      prNodeId as string,
      response.summary,
      response.event,
      response.comments,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown) {
    core.setFailed((error as { message: string }).message);
  }
}

void run();
