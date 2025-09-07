import type { GitHub } from '@actions/github/lib/utils.js';
import type { Config, CustomContext } from './types.js';
declare const getFileChanges: (octokitClient: InstanceType<typeof GitHub>, context: CustomContext, config: Config) => Promise<string>;
/**
 * Retrieves all existing PR interactions (comments, review comments, and reviews)
 * @param octokitClient - Authenticated GitHub API client
 * @param context - GitHub context information for the PR
 * @returns Promise resolving to array of JSON strings containing PR interactions
 */
declare const getPRInteractions: (octokitClient: InstanceType<typeof GitHub>, context: CustomContext) => Promise<Array<string>>;
export { getFileChanges, getPRInteractions };
