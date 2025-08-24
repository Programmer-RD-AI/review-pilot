import type { ReviewComment, ReviewEventTypes } from '../types.js';
declare const createReview: (token: string, prNodeId: string, summary: string, event: ReviewEventTypes, comments: Array<ReviewComment>) => Promise<void>;
export default createReview;
//# sourceMappingURL=prReview.d.ts.map