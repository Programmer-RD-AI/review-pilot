export declare const gemini: {
    getClient: (apiKey: string) => import("@google/generative-ai").GoogleGenerativeAI;
    getModel: (modelName: string, geminiClient: import("@google/generative-ai").GoogleGenerativeAI) => import("@google/generative-ai").GenerativeModel;
    generateResponse: (model: import("@google/generative-ai").GenerativeModel, prompt: string, schema: Record<string, any>) => Promise<string>;
};
//# sourceMappingURL=index.d.ts.map