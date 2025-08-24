import type { CustomContext } from './types.js';
declare const populatePromptTemplate: (prompt: string, context: Record<string, string | undefined>) => string;
declare const fetchFile: (url: string) => Promise<string>;
declare const getGithubContext: () => CustomContext;
declare function isAllowedFileType(filename: string): boolean;
export { getGithubContext, fetchFile, populatePromptTemplate, isAllowedFileType };
