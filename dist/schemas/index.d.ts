export declare const gemini: {
    ReviewCommentsSchema: {
        description: string;
        type: import("@google/generative-ai").SchemaType;
        properties: {
            summary: {
                type: import("@google/generative-ai").SchemaType;
                description: string;
            };
            reviewComments: {
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
                        side: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                        };
                        start_line: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                            nullable: boolean;
                        };
                        start_side: {
                            type: import("@google/generative-ai").SchemaType;
                            description: string;
                            nullable: boolean;
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