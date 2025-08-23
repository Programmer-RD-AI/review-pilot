import * as core from '@actions/core';
import * as github from '@actions/github';
import type { Context } from '@actions/github/lib/context.js';
import { fetchFile, getGithubContext, getPRDiff } from './utils.js';
import type { FileChange } from './types.js';

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true });
    const octokit = github.getOctokit(token);
    const customInstructionUri = core.getInput('customInstructionUri');
    let customInstructions = null;
    const context: Context = getGithubContext();
    if (!context.payload.pull_request) {
      core.setFailed('This action must run on pull_request events');
      return;
    }
    if (customInstructionUri && customInstructionUri.endsWith('.txt')) {
      // TODO: add a warning when the user provides a customInstructionUri yet it is not of type .txt
      customInstructions = fetchFile(customInstructionUri);
    }
    const filesChanged: Array<FileChange> = await getPRDiff(
      octokit,
      context.repo.owner,
      context.repo.repo,
      context.payload.pull_request.number,
    );
    const filesChangedStr: string = JSON.stringify(filesChanged);

    await octokit.rest.pulls.createReviewComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: context.payload.pull_request.number,
      body: '❗ Please check this logic',
      commit_id: context.payload.pull_request['head'].sha,
      path: 'src/utils/math.ts',
      line: 15,
      side: 'RIGHT',
    });
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
