import type { GitHub } from '@actions/github/lib/utils.js';
import type { Config, CustomContext } from './types.js';
declare const getFileChanges: (octokitClient: InstanceType<typeof GitHub>, context: CustomContext, config: Config) => Promise<string>;
declare const getPRInteractions: (octokitClient: InstanceType<typeof GitHub>, context: CustomContext) => Promise<Array<string>>;
export { getFileChanges, getPRInteractions };
