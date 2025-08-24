import * as github from '@actions/github';
import { Template } from '@huggingface/jinja';
import { SUPPORTED_CUSTOM_INSTRUCTIONS_FILE_TYPES } from './constants.js';
import type { CustomContext } from './types.js';

const populatePromptTemplate = (
  prompt: string,
  context: Record<string, string | undefined>,
): string => {
  return new Template(prompt).render(context).trim();
};

const fetchFile = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const text = await response.text();
  return text;
};

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

function isAllowedFileType(filename: string): boolean {
  return SUPPORTED_CUSTOM_INSTRUCTIONS_FILE_TYPES.some((ext) =>
    filename.toLowerCase().endsWith(ext),
  );
}

export { getGithubContext, fetchFile, populatePromptTemplate, isAllowedFileType };
