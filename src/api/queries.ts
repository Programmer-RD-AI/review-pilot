/**
 * Returns the GraphQL mutation query for adding a pull request review
 * @returns GraphQL mutation string for creating PR reviews
 */
const addPullRequestReviewQuery = (): string => {
  return `
      mutation AddReview($input: AddPullRequestReviewInput!) {
        addPullRequestReview(input: $input) {
          pullRequestReview {
            url
          }
        }
      }
    `;
};

export { addPullRequestReviewQuery };
