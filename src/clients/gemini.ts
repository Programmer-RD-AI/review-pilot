import {
  GenerativeModel,
  GoogleGenerativeAI,
  type GenerateContentRequest,
} from '@google/generative-ai';

/**
 * Creates a new Google Generative AI client instance
 * @param apiKey - Google Gemini API key
 * @returns Configured GoogleGenerativeAI client
 */
const getClient = (apiKey: string): GoogleGenerativeAI => {
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Gets a specific generative model from the Gemini client
 * @param modelName - Name of the model to use (e.g., 'gemini-pro')
 * @param geminiClient - Configured GoogleGenerativeAI client
 * @returns GenerativeModel instance for the specified model
 */
const getModel = (modelName: string, geminiClient: GoogleGenerativeAI): GenerativeModel => {
  return geminiClient.getGenerativeModel({ model: modelName });
};

/**
 * Generates a structured response using the Gemini model
 * @param model - Configured GenerativeModel instance
 * @param prompt - System prompt/instructions for the model
 * @param schema - JSON schema defining the expected response structure
 * @returns Promise resolving to the generated response text
 */
const generateResponse = async (
  model: GenerativeModel,
  prompt: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any>,
): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const generativeContent: GenerateContentRequest = getGenerativeContentRequest(prompt, schema);
  const result = await model.generateContent(generativeContent);
  return result.response.text();
};

/**
 * Creates a structured content request for the Gemini API
 * @param prompt - System instruction prompt
 * @param schema - JSON schema for response validation
 * @returns Configured GenerateContentRequest object
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGenerativeContentRequest = (prompt: string, schema: Record<string, any>): any => {
  return {
    contents: [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: schema,
    },
  };
};

export { getClient, getModel, generateResponse };
