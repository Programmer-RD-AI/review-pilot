import * as core from '@actions/core';
import * as github from '@actions/github';
import { getGithubContext, populatePromptTemplate } from './utils.js';
import type { Config, CustomContext, ReviewComments } from './types.js';
import { ReviewCommentsSchema } from './schemas/gemini.js';
import createReview from './api/prReview.js';
import getPrReviewBasePrompt from './prompts/prReviewPrompt.js';
import { getConfig } from './config.js';
import { getFileChanges, getPRInteractions } from './data.js';
import { geminiClient } from './clients/index.js';

async function run(): Promise<void> {
  try {
    const config: Config = await getConfig();
    const octokit = github.getOctokit(config.token);
    let context: CustomContext;
    try {
      context = getGithubContext();
    } catch {
      core.setFailed('This action must run on pull_request events');
      return;
    }
    const fileChanges: string = await getFileChanges(octokit, context, config);
    const [existingComments, existingReviewComments, existingReviews] = await getPRInteractions(
      octokit,
      context,
    );
    const prompt = populatePromptTemplate(getPrReviewBasePrompt(), {
      custom_instructions: config.customInstructions,
      files_changed: fileChanges,
      pr_description: context.prDescription,
      existing_reviews: existingReviews,
      existing_comments: existingComments,
      existing_review_comments: existingReviewComments,
      level: config.level,
    });
    const client = geminiClient.getClient(config.apiKey);
    const geminiModel = geminiClient.getModel(config.model, client);
    const rawResponse = await geminiClient.generateResponse(
      geminiModel,
      prompt,
      ReviewCommentsSchema,
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: ReviewComments = JSON.parse(rawResponse);
    await createReview(
      config.token,
      context.prNodeId,
      response.summary,
      response.event,
      response.comments,
    );
  } catch (error: unknown) {
    core.setFailed((error as { message: string }).message);
  }
}

void run();
