import type { CustomContext } from './types.js';
/**
 * Checks if a file should be excluded from code review based on path and name patterns
 * @param filename - The filename to check
 * @returns True if the file should be excluded, false otherwise
 */
declare const shouldExcludeFile: (filename: string) => boolean;
/**
 * Populates a Jinja2 template string with provided context variables
 * @param prompt - The template string containing Jinja2 placeholders
 * @param context - Key-value pairs to substitute in the template
 * @returns The rendered template string with variables replaced
 */
declare const populatePromptTemplate: (prompt: string, context: Record<string, string | undefined>) => string;
/**
 * Fetches text content from a remote URL
 * @param url - The URL to fetch content from
 * @returns Promise resolving to the text content of the response
 * @throws Error if the HTTP request fails
 */
declare const fetchFile: (url: string) => Promise<string>;
/**
 * Extracts GitHub context information from the current pull request event
 * @returns CustomContext object containing PR details
 * @throws Error if not running in a pull request context
 */
declare const getGithubContext: () => CustomContext;
/**
 * Checks if a filename has an allowed file extension for custom instructions
 * @param filename - The filename to check
 * @returns True if the file type is supported, false otherwise
 */
declare function isAllowedFileType(filename: string): boolean;
/**
 * Parses query parameters from a URL string
 * @param url - The URL string to parse (optional)
 * @returns Object containing key-value pairs of query parameters
 */
declare function parseQueryParams(url: string | undefined): Record<string, string>;
export { parseQueryParams, getGithubContext, fetchFile, populatePromptTemplate, isAllowedFileType, shouldExcludeFile };
