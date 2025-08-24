import { graphql } from '@octokit/graphql';
import type { ReviewComment, ReviewEventTypes } from '../types.js';
import { addPullRequestReviewQuery } from './queries.js';
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
