import { graphql } from '@octokit/graphql';
import type { ReviewComment } from '../types.js';
const createReview = async (
  token: string,
  prNodeId: string,
  summary: string,
  event: 'COMMENT' | 'REQUEST_CHANGES',
  comments: Array<ReviewComment>,
) => {
  await graphql(
    `
      mutation AddReview($input: AddPullRequestReviewInput!) {
        addPullRequestReview(input: $input) {
          pullRequestReview {
            url
          }
        }
      }
    `,
    {
      input: {
        pullRequestId: prNodeId,
        body: summary,
        event: event,
        comments: comments,
      },
      headers: {
        authorization: `token ${token}`,
      },
    },
  );
};
export default createReview;
