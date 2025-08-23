enum ReviewCommentSide {
  RIGHT = 'RIGHT',
  LEFT = 'LEFT',
}
type ReviewComment = {
  body: string;
  path: string;
  line: number;
  side: ReviewCommentSide;
};
type ReviewComments = {
  reviewComments: Array<ReviewComment>;
};
enum FileStatus {
  MODIFIED = 'modified',
  ADDED = 'added',
}
type FileChange = {
  fileName: string;
  status: FileStatus;
  additions: number;
  deletions: number;
  changes: number;
  diff: string | undefined;
};
export type { ReviewComments, ReviewComment, FileChange };
export { ReviewCommentSide, FileStatus };
