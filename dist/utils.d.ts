import type { Context } from '@actions/github/lib/context.js';
import type { GitHub } from '@actions/github/lib/utils.js';
import type { FileChange } from './types.js';
declare const getPRDiff: (octokitClient: InstanceType<typeof GitHub>, repoOwner: string, repo: string, pullNumber: number) => Promise<Array<FileChange>>;
declare const fetchFile: (url: string) => Promise<string>;
declare const getGithubContext: () => Context;
export { getPRDiff, getGithubContext, fetchFile };
