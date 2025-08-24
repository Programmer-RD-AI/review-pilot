import type { ReviewComment } from './types.js';
declare const createReview: (token: string, prNodeId: string, summary: string, comments: Array<ReviewComment>) => Promise<void>;
export default createReview;
