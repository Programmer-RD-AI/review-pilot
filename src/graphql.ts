import { graphql } from '@octokit/graphql';
const createReview = async (
  token: string,
  prNodeId: string,
  summary: string,
  singleCommentThread: Array<Record<string, any>>,
  multiLineThreads: Array<Record<string, any>>,
) => {
  await graphql(
    `
      mutation CreateReview($input: CreatePullRequestReviewInput!) {
        createPullRequestReview(input: $input) {
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
        event: 'COMMENT',
        threads: [...singleCommentThread, ...multiLineThreads],
      },
      headers: {
        authorization: `token ${token}`,
      },
    },
  );
};
export default createReview;
