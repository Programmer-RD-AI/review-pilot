import {
  GenerativeModel,
  GoogleGenerativeAI,
  type GenerateContentRequest,
} from '@google/generative-ai';

const getClient = (apiKey: string): GoogleGenerativeAI => {
  return new GoogleGenerativeAI(apiKey);
};

const getModel = (modelName: string, geminiClient: GoogleGenerativeAI): GenerativeModel => {
  return geminiClient.getGenerativeModel({ model: modelName });
};
const generateResponse = async (
  model: GenerativeModel,
  prompt: string,
  schema: Record<string, any>,
): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const generativeContent: GenerateContentRequest = getGenerativeContentRequest(prompt, schema);
  const result = await model.generateContent(generativeContent);
  return result.response.text();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGenerativeContentRequest = (prompt: string, schema: Record<string, any>): any => {
  return {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  };
};

export { getClient, getModel, generateResponse };
