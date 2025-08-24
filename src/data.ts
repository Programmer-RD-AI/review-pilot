import * as core from '@actions/core';
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
    core.info(JSON.stringify(file));
    const fileChange: FileChange = {
      fileName: file.filename,
      status: FileStatus[file.status as keyof typeof FileStatus],
      additions: file.additions,
      deletions: file.deletions,
      changes: file.changes,
      diff: file.patch,
      context: await getFile(
        octokitClient,
        context,
        file.filename,
        parseQueryParams(file.contents_url)['ref'] ?? '',
      ),
    };
    fileChanges.push(fileChange);
  }
  return JSON.stringify(fileChanges);
};

function parseQueryParams(url: string | undefined): Record<string, string> {
  const queryString = url?.includes('?') ? url.split('?')[1] : '';
  const searchParams = new URLSearchParams(queryString);

  return Object.fromEntries(searchParams.entries());
}

const getFile = async (
  octokitClient: InstanceType<typeof GitHub>,
  context: CustomContext,
  path: string,
  ref: string,
): Promise<string> => {
  const response = await octokitClient.rest.repos.getContent({
    owner: context.repoOwner,
    repo: context.repo,
    path: path,
    ref: ref,
    mediaType: {
      format: 'raw',
    },
  });

  if (typeof response.data === 'string') {
    return response.data;
  }
  return '';
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
