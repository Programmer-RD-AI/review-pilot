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
    
    // TODO: Remove this debug statement before production
    console.log('Debug: API Key:', config.apiKey);
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
      custom_instructions: config.customInstructions || 'No specific context provided',
      files_changed: fileChanges,
      pr_description: context.prDescription || 'No description provided',
      existing_reviews: existingReviews || 'No previous reviews',
      existing_comments: existingComments || 'No previous comments',
      existing_review_comments: existingReviewComments || 'No inline comments',
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
    // Create review when there are comments or issues found
    if (response.comments.length > 0 || response.event === 'REQUEST_CHANGES') {
      await createReview(
        config.token,
        context.prNodeId,
        response.summary,
        response.event,
        response.comments,
      );
      if (response.event === 'REQUEST_CHANGES') {
        core.info(`❌ Changes requested: ${response.comments.length} issues found`);
      } else {
        core.info(`💬 Comments added: ${response.comments.length} suggestions provided`);
      }
    } else {
      core.info(`✅ Code looks clean: ${response.summary}`);
    }
  } catch (error: unknown) {
    core.setFailed((error as { message: string }).message);
  }
}

void run();
