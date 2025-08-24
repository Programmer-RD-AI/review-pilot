import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description:
    'Code review output from an expert engineer analyzing Git diff patches. Comments focus only on issues visible in the provided patches.',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description:
        'Human-like assessment of the code changes based on what is visible in the patches. Use language like "Solid changes, no red flags in what I can see" or describe specific concerns found in the diff patches.',
    },
    event: {
      type: SchemaType.STRING,
      description:
        'Review decision: "REQUEST_CHANGES" for critical issues found in the patches that will cause production problems. "COMMENT" for suggestions and observations about the visible changes.',
      enum: ['COMMENT', 'REQUEST_CHANGES'],
    },
    comments: {
      type: SchemaType.ARRAY,
      description:
        'Array of specific issues found in the diff patches. Only include comments for problems you can actually see and verify in the provided patch data. Focus on new code (+ lines) and problematic patterns visible in the changes.',
      items: {
        type: SchemaType.OBJECT,
        description:
          'Individual review comment targeting a specific line or section within the visible patch',
        properties: {
          body: {
            type: SchemaType.STRING,
            description:
              'Explanation of the issue found in the patch. Be specific about what you can see that is problematic. Only include ```suggestion code blocks if you have enough context from the patch to provide a complete, correct fix. Otherwise, focus on explaining the issue and its potential impact. Reference specific lines or patterns visible in the patch.',
          },
          path: {
            type: SchemaType.STRING,
            description:
              'Exact file path from the provided diff data where the issue exists. Must match a file that has patches in the provided data.',
          },
          position: {
            type: SchemaType.NUMBER,
            description:
              "Line position within the specific file's patch where the comment applies. Count starts at 1 immediately after each @@ header line in that file's patch. This must reference a line that actually exists in the provided patch data.",
          },
        },
        required: ['body', 'path', 'position'],
      },
    },
  },
  required: ['summary', 'event', 'comments'],
};

export { ReviewCommentsSchema };
