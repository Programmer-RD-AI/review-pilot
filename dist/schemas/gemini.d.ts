import { SchemaType } from '@google/generative-ai';
declare const ReviewCommentsSchema: {
    description: string;
    type: SchemaType;
    properties: {
        summary: {
            type: SchemaType;
            description: string;
        };
        singleCommentThreads: {
            type: SchemaType;
            description: string;
            items: {
                type: SchemaType;
                description: string;
                properties: {
                    body: {
                        type: SchemaType;
                        description: string;
                    };
                    path: {
                        type: SchemaType;
                        description: string;
                    };
                    position: {
                        type: SchemaType;
                        description: string;
                    };
                };
                required: string[];
            };
        };
        multiLineThreads: {
            type: SchemaType;
            description: string;
            items: {
                type: SchemaType;
                description: string;
                properties: {
                    body: {
                        type: SchemaType;
                        description: string;
                    };
                    path: {
                        type: SchemaType;
                        description: string;
                    };
                    line: {
                        type: SchemaType;
                        description: string;
                    };
                    startLine: {
                        type: SchemaType;
                        description: string;
                    };
                    side: {
                        type: SchemaType;
                        description: string;
                    };
                    startSide: {
                        type: SchemaType;
                        description: string;
                    };
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export { ReviewCommentsSchema };
//# sourceMappingURL=gemini.d.ts.map