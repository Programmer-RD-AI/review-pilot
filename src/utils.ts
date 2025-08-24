import * as github from '@actions/github';
import type { Context } from '@actions/github/lib/context.js';
import type { GitHub } from '@actions/github/lib/utils.js';
import type { FileChange } from './types.js';
import { FileStatus } from './types.js';

const getPRDiff = async (
  octokitClient: InstanceType<typeof GitHub>,
  repoOwner: string,
  repo: string,
  pullNumber: number,
): Promise<Array<FileChange>> => {
  const files = await octokitClient.rest.pulls.listFiles({
    repo,
    pull_number: pullNumber,
    owner: repoOwner,
  });
  const fileChanges: FileChange[] = Array<FileChange>();
  for (const file of files.data) {
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
  return fileChanges;
};
const fetchFile = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const text = await response.text();
  return text;
};

const getGithubContext = (): Context => {
  // TODO: return custom type with the only required parts from context
  const { context } = github;
  return context;
};

export { getPRDiff, getGithubContext, fetchFile };
