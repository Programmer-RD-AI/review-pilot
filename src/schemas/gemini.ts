import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description: 'Structured review comments with an overall summary',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description: 'A concise overall summary of the review',
    },
    comments: {
      type: SchemaType.ARRAY,
      description: 'List of individual review comments',
      items: {
        type: SchemaType.OBJECT,
        description: 'A single review comment item',
        properties: {
          body: {
            type: SchemaType.STRING,
            description: 'Detailed feedback or suggestion',
          },
          path: {
            type: SchemaType.STRING,
            description: 'File path related to the comment',
          },
          position: {
            type: SchemaType.NUMBER,
            description: 'Line number in the diff where the comment applies',
          },
        },
        required: ['body', 'path', 'position'],
      },
    },
  },
  required: ['summary', 'comments'],
};

export { ReviewCommentsSchema };
