import * as github from '@actions/github';
import { Template } from '@huggingface/jinja';
import { SUPPORTED_CUSTOM_INSTRUCTIONS_FILE_TYPES } from './constants.js';
import type { CustomContext } from './types.js';
import { EXCLUDED_DIRECTORIES, EXCLUDED_FILE_PATTERNS } from './constants.js';

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
    if (
      normalizedPath.startsWith(lowerExcludedDir + '/') ||
      normalizedPath.includes('/' + lowerExcludedDir + '/')
    ) {
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

/**
 * Populates a Jinja2 template string with provided context variables
 * @param prompt - The template string containing Jinja2 placeholders
 * @param context - Key-value pairs to substitute in the template
 * @returns The rendered template string with variables replaced
 */
const populatePromptTemplate = (
  prompt: string,
  context: Record<string, string | undefined>,
): string => {
  return new Template(prompt).render(context).trim();
};

/**
 * Fetches text content from a remote URL
 * @param url - The URL to fetch content from
 * @returns Promise resolving to the text content of the response
 * @throws Error if the HTTP request fails
 */
const fetchFile = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const text = await response.text();
  return text;
};

/**
 * Extracts GitHub context information from the current pull request event
 * @returns CustomContext object containing PR details
 * @throws Error if not running in a pull request context
 */
const getGithubContext = (): CustomContext => {
  const { context } = github;
  const pr = context.payload.pull_request;
  if (!pr) {
    throw Error('This action must run on pull_request events');
  }
  return {
    prNodeId: pr['node_id'] as string,
    prDescription: pr.body ?? '',
    repoOwner: context.repo.owner,
    repo: context.repo.repo,
    prNumber: pr.number,
  };
};

/**
 * Checks if a filename has an allowed file extension for custom instructions
 * @param filename - The filename to check
 * @returns True if the file type is supported, false otherwise
 */
function isAllowedFileType(filename: string): boolean {
  return SUPPORTED_CUSTOM_INSTRUCTIONS_FILE_TYPES.some((ext) =>
    filename.toLowerCase().endsWith(ext),
  );
}

/**
 * Parses query parameters from a URL string
 * @param url - The URL string to parse (optional)
 * @returns Object containing key-value pairs of query parameters
 */
function parseQueryParams(url: string | undefined): Record<string, string> {
  const queryString = url?.includes('?') ? url.split('?')[1] : '';
  const searchParams = new URLSearchParams(queryString);

  return Object.fromEntries(searchParams.entries());
}

export { parseQueryParams, getGithubContext, fetchFile, populatePromptTemplate, isAllowedFileType, shouldExcludeFile };
