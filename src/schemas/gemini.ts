import { SchemaType } from '@google/generative-ai';

const ReviewCommentsSchema = {
  description:
    'Structured code review output from a legendary senior engineer who only flags real problems that matter in production',
  type: SchemaType.OBJECT,
  properties: {
    summary: {
      type: SchemaType.STRING,
      description:
        'Human-like assessment of the code changes in 1-2 sentences. Use casual but professional language like "Solid work, no red flags here" or describe actual concerns found.',
    },
    event: {
      type: SchemaType.STRING,
      description:
        'Review decision based on issue severity: "REQUEST_CHANGES" for critical issues that will break production, cause security vulnerabilities, or create major problems. "COMMENT" for suggestions and improvements.',
      enum: ['COMMENT', 'REQUEST_CHANGES'],
    },
    comments: {
      type: SchemaType.ARRAY,
      description:
        'Array of specific code review issues. Only include comments for genuine problems that will cause production pain, security risks, performance disasters, or maintenance nightmares. Skip style nitpicks and subjective preferences.',
      items: {
        type: SchemaType.OBJECT,
        description: 'Individual review comment targeting a specific issue in the code',
        properties: {
          body: {
            type: SchemaType.STRING,
            description:
              'Detailed explanation written like mentoring a respected colleague. Include: what the problem is, why it matters in production, real-world impact, and concrete solution with ```suggestion code blocks. Reference specific lines and explain the underlying issue.',
          },
          path: {
            type: SchemaType.STRING,
            description:
              'Exact file path from the diff where the issue exists (e.g., "src/components/UserAuth.tsx")',
          },
          position: {
            type: SchemaType.NUMBER,
            description:
              'Line position within the diff hunk where the comment applies. Count starts at 1 immediately after the @@ header line. This should target the specific problematic line in the new code.',
          },
        },
        required: ['body', 'path', 'position'],
      },
    },
  },
  required: ['summary', 'event', 'comments'],
};

export { ReviewCommentsSchema };
