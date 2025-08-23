import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  type: SchemaType.OBJECT,
  properties: {
    reviewComments: {
      type: SchemaType.ARRAY,
      items: {
        body: { type: SchemaType.STRING },
        path: { type: SchemaType.STRING },
        line: { type: SchemaType.NUMBER },
        side: { type: SchemaType.STRING },
      },
    },
  },
  required: ['reviewComments'],
};

export { ReviewCommentsSchema };
