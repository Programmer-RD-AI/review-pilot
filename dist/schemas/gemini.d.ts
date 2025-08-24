import { SchemaType } from '@google/generative-ai';
declare const ReviewCommentsSchema: {
    description: string;
    type: SchemaType;
    properties: {
        summary: {
            type: SchemaType;
            description: string;
        };
        reviewComments: {
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
                };
                required: string[];
            };
        };
    };
    required: string[];
};
export { ReviewCommentsSchema };
//# sourceMappingURL=gemini.d.ts.map