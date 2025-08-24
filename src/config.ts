import type { Config, ReviewLevel } from './types.js';
import * as core from '@actions/core';
import { fetchFile, isAllowedFileType } from './utils.js';
import { SUPPORTED_CUSTOM_INSTRUCTIONS_FILE_TYPES } from './constants.js';
const getConfig = async (): Promise<Config> => {
  const token = core.getInput('token', { required: true });
  const customInstructionsUri = core.getInput('customInstructionUri');
  let customInstructions;
  if (customInstructionsUri) {
    if (!isAllowedFileType(customInstructionsUri)) {
      core.warning(
        `File "${customInstructionsUri}" is not in the allowed list. Allowed extensions are: ${SUPPORTED_CUSTOM_INSTRUCTIONS_FILE_TYPES.join(', ')}`,
      );
    } else {
      customInstructions = await fetchFile(customInstructionsUri);
    }
  }
  const apiKey = core.getInput('apiKey', { required: true });
  const model = core.getInput('model');
  const level = core.getInput('level') as ReviewLevel;
  const maxChanges = parseInt(core.getInput('maxChanges'));
  return {
    token,
    customInstructions,
    apiKey,
    model,
    level,
    maxChanges,
  };
};
export { getConfig };
