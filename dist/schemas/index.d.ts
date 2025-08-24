export declare const gemini: {
    ReviewCommentsSchema: {
        description: string;
        type: import("@google/generative-ai").SchemaType;
        properties: {
            summary: {
                type: import("@google/generative-ai").SchemaType;
                description: string;
            };
            singleCommentThreads: {
                type: import("@google/generative-ai").SchemaType;
                description: string;
                items: {
                    type: import("@google/generative-ai").SchemaType;
                    description: string;
                    properties: {
                        body: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        path: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        position: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                    };
                    required: string[];
                };
            };
            multiLineThreads: {
                type: import("@google/generative-ai").SchemaType;
                description: string;
                items: {
                    type: import("@google/generative-ai").SchemaType;
                    description: string;
                    properties: {
                        body: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        path: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        line: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        startLine: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        side: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        startSide: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                    };
                    required: string[];
                };
            };
        };
        required: string[];
    };
};
//# sourceMappingURL=index.d.ts.map