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
