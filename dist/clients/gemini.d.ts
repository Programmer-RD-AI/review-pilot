import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
/**
 * Creates a new Google Generative AI client instance
 * @param apiKey - Google Gemini API key
 * @returns Configured GoogleGenerativeAI client
 */
declare const getClient: (apiKey: string) => GoogleGenerativeAI;
/**
 * Gets a specific generative model from the Gemini client
 * @param modelName - Name of the model to use (e.g., 'gemini-pro')
 * @param geminiClient - Configured GoogleGenerativeAI client
 * @returns GenerativeModel instance for the specified model
 */
declare const getModel: (modelName: string, geminiClient: GoogleGenerativeAI) => GenerativeModel;
/**
 * Generates a structured response using the Gemini model
 * @param model - Configured GenerativeModel instance
 * @param prompt - System prompt/instructions for the model
 * @param schema - JSON schema defining the expected response structure
 * @returns Promise resolving to the generated response text
 */
declare const generateResponse: (model: GenerativeModel, prompt: string, schema: Record<string, any>) => Promise<string>;
export { getClient, getModel, generateResponse };
//# sourceMappingURL=gemini.d.ts.map