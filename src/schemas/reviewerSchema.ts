import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description: 'Comprehensive code review output analyzing security, performance, maintainability, and correctness.',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description: 'Comprehensive assessment of changes including overall quality, security, and maintainability.',
    },
    event: {
      type: SchemaType.STRING,
      description: 'APPROVE for clean code, REQUEST_CHANGES for critical issues, COMMENT for suggestions and minor issues.',
      enum: ['APPROVE', 'COMMENT', 'REQUEST_CHANGES'],
    },
    comments: {
      type: SchemaType.ARRAY,
      description: 'Array of issues found across security, performance, maintainability, correctness, and best practices in NEW/CHANGED code only.',
      items: {
        type: SchemaType.OBJECT,
        properties: {
          body: {
            type: SchemaType.STRING,
            description: 'Clear explanation of the issue with category (Security/Performance/Maintainability/Correctness/Best Practice), impact, and suggested fix.',
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
