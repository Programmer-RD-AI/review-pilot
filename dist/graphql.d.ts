declare const createReview: (token: string, prNodeId: string, summary: string, singleCommentThread: Array<Record<string, any>>, multiLineThreads: Array<Record<string, any>>) => Promise<void>;
export default createReview;
