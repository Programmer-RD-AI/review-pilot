import { generateResponse, getClient, getModel } from './gemini.js';

export const gemini = {
  ...getClient,
  ...getModel,
  ...generateResponse,
};
