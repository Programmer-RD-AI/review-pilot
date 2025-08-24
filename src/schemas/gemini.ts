import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description:
    'Code review output from an expert engineer who carefully analyzes both Git diff patches AND full file context to avoid commenting on existing code. Use chain-of-thought reasoning to verify issues before commenting.',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description:
        'Human-like assessment acknowledging both what you can verify and context limitations. Example: "Solid changes to the auth flow - no issues in what I can see, though the validation logic might be elsewhere in the codebase." Be honest about what you cannot see rather than making assumptions.',
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
        'Array of specific issues found ONLY in NEW/CHANGED code. MANDATORY: Before adding any comment, verify the issue does not already exist in the full file context. Only comment on problems introduced by the patch changes.',
      items: {
        type: SchemaType.OBJECT,
        description:
          'Individual review comment targeting a specific line or section within the visible patch',
        properties: {
          body: {
            type: SchemaType.STRING,
            description:
              'Explanation of the issue found in NEW/CHANGED code only. CRITICAL: You have both patch and full file context - do not comment on things that already exist in the complete file. Only comment on genuine problems introduced by the changes.',
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
