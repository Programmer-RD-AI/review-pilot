import type { Config } from './types.js';
/**
 * Retrieves and validates configuration from GitHub Actions inputs
 * @returns Promise resolving to a complete Config object
 */
declare const getConfig: () => Promise<Config>;
export { getConfig };
