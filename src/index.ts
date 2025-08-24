import * as core from '@actions/core';
import * as github from '@actions/github';
import { getGithubContext, populatePromptTemplate } from './utils.js';
import type { Config, CustomContext, ReviewComments } from './types.js';
import { ReviewCommentsSchema } from './schemas/reviewerSchema.js';
import createReview from './api/pullRequestReview.js';
import getPrReviewBasePrompt from './prompts/basePrompt.js';
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
    core.info('test4');
    const prompt = populatePromptTemplate(getPrReviewBasePrompt(), {
      custom_instructions: config.customInstructions || 'No specific context provided',
      files_changed: fileChanges,
      pr_description: context.prDescription || 'No description provided',
      existing_reviews: existingReviews || 'No previous reviews',
      existing_comments: existingComments || 'No previous comments',
      existing_review_comments: existingReviewComments || 'No inline comments',
      level: config.level,
    });
    core.info('test3');
    const client = geminiClient.getClient(config.apiKey);
    core.info('test1');
    const geminiModel = geminiClient.getModel(config.model, client);
    core.info('test2');
    const rawResponse = await geminiClient.generateResponse(
      geminiModel,
      prompt,
      ReviewCommentsSchema,
    );
    core.info(rawResponse);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response: ReviewComments = JSON.parse(rawResponse);
    // Only create review if there are actual comments
    if (response.comments.length > 0) {
      await createReview(
        config.token,
        context.prNodeId,
        response.summary,
        response.event,
        response.comments,
      );
    } else {
      core.info('No actionable feedback needed - skipping review creation');
    }
  } catch (error: unknown) {
    core.setFailed((error as { message: string }).message);
  }
}

void run();
