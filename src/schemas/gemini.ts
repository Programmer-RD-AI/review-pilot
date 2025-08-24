import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description: 'Structured review comments with an overall summary',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description: 'A concise overall summary of the review',
    },
    reviewComments: {
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
          line: {
            type: SchemaType.NUMBER,
            description: 'Line number in the diff where the comment applies',
          },
          side: {
            type: SchemaType.STRING,
            description: 'Side of the diff (e.g., LEFT, RIGHT)',
          },
          start_line: {
            type: SchemaType.NUMBER,
            description: 'Optional starting line number for multi-line changes',
            nullable: true,
          },
          start_side: {
            type: SchemaType.STRING,
            description: 'Optional starting side for multi-line changes',
            nullable: true,
          },
        },
        required: ['body', 'path', 'line', 'side'],
      },
    },
  },
  required: ['reviewComments', 'summary'],
};

export { ReviewCommentsSchema };
