import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description: 'Structured review comments with an overall summary',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description: 'A concise overall summary of the review',
    },
    singleCommentThreads: {
      type: SchemaType.ARRAY,
      description: 'List of individual single-line review comments',
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
    multiLineThreads: {
      type: SchemaType.ARRAY,
      description: 'List of individual multi-line review comments',
      items: {
        type: SchemaType.OBJECT,
        description: 'A single multi-line review comment item',
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
            description: 'The end line number in the file for the comment.',
          },
          startLine: {
            type: SchemaType.NUMBER,
            description: 'The start line number for multi-line comments.',
          },
          side: {
            type: SchemaType.STRING,
            description: 'The side of the diff to comment on.',
          },
          startSide: {
            type: SchemaType.STRING,
            description: 'The side of the diff to start a multi-line comment on.',
          },
        },
        required: ['body', 'path', 'line', 'startLine', 'side', 'startSide'],
      },
    },
  },
  required: ['summary', 'singleCommentThreads', 'multiLineThreads'],
};

export { ReviewCommentsSchema };
