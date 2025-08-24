import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
declare const getClient: (apiKey: string) => GoogleGenerativeAI;
declare const getModel: (modelName: string, geminiClient: GoogleGenerativeAI) => GenerativeModel;
declare const generateResponse: (model: GenerativeModel, prompt: string, schema: Record<string, any>) => Promise<string>;
export { getClient, getModel, generateResponse };
//# sourceMappingURL=gemini.d.ts.map