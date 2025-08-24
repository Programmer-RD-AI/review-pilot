import type { ReviewComment } from '../types.js';
declare const createReview: (token: string, prNodeId: string, summary: string, event: "COMMENT" | "REQUEST_CHANGES", comments: Array<ReviewComment>) => Promise<void>;
export default createReview;
//# sourceMappingURL=prReview.d.ts.map