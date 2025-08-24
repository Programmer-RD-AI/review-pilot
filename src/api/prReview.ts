import { graphql } from '@octokit/graphql';
import type { ReviewComment, ReviewEventTypes } from '../types.js';
import { addPullRequestReviewQuery } from './queries.js';
/**
 * Creates a new pull request review using GitHub GraphQL API
 * @param token - GitHub authentication token
 * @param prNodeId - GitHub GraphQL node ID of the pull request
 * @param summary - Review summary text
 * @param event - Type of review event (COMMENT or REQUEST_CHANGES)
 * @param comments - Array of review comments to add
 * @returns Promise that resolves when review is created
 */
const createReview = async (
  token: string,
  prNodeId: string,
  summary: string,
  event: ReviewEventTypes,
  comments: Array<ReviewComment>,
) => {
  await graphql(addPullRequestReviewQuery(), {
    input: {
      pullRequestId: prNodeId,
      body: summary,
      event: event,
      comments: comments,
    },
    headers: {
      authorization: `token ${token}`,
    },
  });
};
export default createReview;
