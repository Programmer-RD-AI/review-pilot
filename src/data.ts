import type { GitHub } from '@actions/github/lib/utils.js';
import type { Config, CustomContext, FileChange } from './types.js';
import { FileStatus } from './types.js';
import { parseQueryParams } from './utils.js';
import { EXCLUDED_DIRECTORIES, EXCLUDED_FILE_PATTERNS } from './constants.js';
import * as core from '@actions/core';

/**
 * Retrieves and processes file changes from a pull request
 * @param octokitClient - Authenticated GitHub API client
 * @param context - GitHub context information for the PR
 * @param config - Configuration object containing review settings
 * @returns Promise resolving to JSON string of file changes
 */
/**
 * Checks if a file should be excluded from code review based on path and name patterns
 * @param filename - The filename to check
 * @returns True if the file should be excluded, false otherwise
 */
const shouldExcludeFile = (filename: string): boolean => {
  // Check if file is in an excluded directory
  const normalizedPath = filename.toLowerCase();
  for (const excludedDir of EXCLUDED_DIRECTORIES) {
    const lowerExcludedDir = excludedDir.toLowerCase();
    if (normalizedPath.startsWith(lowerExcludedDir + '/') || 
        normalizedPath.includes('/' + lowerExcludedDir + '/')) {
      return true;
    }
  }
  
  // Check if file matches excluded patterns
  for (const pattern of EXCLUDED_FILE_PATTERNS) {
    const lowerPattern = pattern.toLowerCase();
    if (normalizedPath.endsWith(lowerPattern)) {
      return true;
    }
  }
  
  return false;
};

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
    // Skip files that exceed the change limit
    if (file.changes > config.maxChanges) {
      continue;
    }
    
    // Skip build/generated files
    if (shouldExcludeFile(file.filename)) {
      core.info(`Skipping generated/build file: ${file.filename}`);
      continue;
    }
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

/**
 * Fetches the content of a specific file from a GitHub repository
 * @param octokitClient - Authenticated GitHub API client
 * @param context - GitHub context information
 * @param path - File path relative to repository root
 * @param ref - Git reference (branch/commit) to fetch from
 * @returns Promise resolving to file content as string
 */
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

/**
 * Retrieves all existing PR interactions (comments, review comments, and reviews)
 * @param octokitClient - Authenticated GitHub API client
 * @param context - GitHub context information for the PR
 * @returns Promise resolving to array of JSON strings containing PR interactions
 */
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
