import {
  GenerativeModel,
  GoogleGenerativeAI,
  type GenerateContentRequest,
} from '@google/generative-ai';
import { ReviewCommentsSchema } from '../schemas/gemini.js';

const getClient = (apiKey: string): GoogleGenerativeAI => {
  return new GoogleGenerativeAI(apiKey);
};

const getModel = (modelName: string, geminiClient: GoogleGenerativeAI): GenerativeModel => {
  return geminiClient.getGenerativeModel({ model: modelName });
};
const generateResponse = async (model: GenerativeModel): Promise<string> => {
  const generativeContent: GenerateContentRequest = getGenerativeContentRequest();
  const result = await model.generateContent(generativeContent);
  return result.response.text();
};

const getGenerativeContentRequest = (): any => {
  return {
    contents: [{ role: 'user', parts: [{ text: 'Give me a code review summary' }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: ReviewCommentsSchema,
    },
  };
};

export { getClient, getModel, generateResponse };
