import type { GitHub } from '@actions/github/lib/utils.js';
import type { Config, CustomContext, FileChange } from './types.js';
import { FileStatus } from './types.js';

const getFileChanges = async (
  octokitClient: InstanceType<typeof GitHub>,
  context: CustomContext,
  config: Config,
): Promise<string> => {
  const files = await octokitClient.rest.pulls.listFiles({
    repo: context.repo,
    pull_number: context.prNumber,
    owner: context.repoOwner,
  });
  const fileChanges: FileChange[] = Array<FileChange>();
  for (const file of files.data) {
    if (file.changes > config.maxChanges) {
      continue;
    }
    const fileChange: FileChange = {
      fileName: file.filename,
      status: FileStatus[file.status as keyof typeof FileStatus],
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      diff: file.patch,
    };
    fileChanges.push(fileChange);
  }
  return JSON.stringify(fileChanges);
};

const getPRInteractions = async (
  octokitClient: InstanceType<typeof GitHub>,
  context: CustomContext,
): Promise<Array<string>> => {
  const existingCommentsData = await octokitClient.rest.issues.listComments({
    owner: context.repoOwner,
    repo: context.repo,
    issue_number: context.prNumber,
  });
  const existingReviewCommentsData = await octokitClient.rest.pulls.listReviewComments({
    owner: context.repoOwner,
    repo: context.repo,
    pull_number: context.prNumber,
  });
  const existingReviewData = await octokitClient.rest.pulls.listReviews({
    owner: context.repoOwner,
    repo: context.repo,
    pull_number: context.prNumber,
  });
  return [
    JSON.stringify(existingCommentsData),
    JSON.stringify(existingReviewCommentsData),
    JSON.stringify(existingReviewData),
  ];
};

export { getFileChanges, getPRInteractions };
