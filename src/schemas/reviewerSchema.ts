import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description: 'Code review output focusing on bugs, security issues, and serious problems in new/changed code only.',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description: 'Brief assessment of the changes in 1-2 sentences. Be direct and honest about what you found.',
    },
    event: {
      type: SchemaType.STRING,
      description: 'Either "REQUEST_CHANGES" for critical issues or "COMMENT" for suggestions.',
      enum: ['COMMENT', 'REQUEST_CHANGES'],
    },
    comments: {
      type: SchemaType.ARRAY,
      description: 'Array of specific issues found in NEW/CHANGED code only. Check full file context first.',
      items: {
        type: SchemaType.OBJECT,
        properties: {
          body: {
            type: SchemaType.STRING,
            description: 'Clear explanation of the specific problem and why it matters.',
          },
          path: {
            type: SchemaType.STRING,
            description: 'File path from the diff data.',
          },
          position: {
            type: SchemaType.INTEGER,
            description: 'Line number within the patch (starts at 1 after each @@ header).',
          },
        },
        required: ['body', 'path', 'position'],
      },
    },
  },
  required: ['summary', 'event', 'comments'],
};

export { ReviewCommentsSchema };
