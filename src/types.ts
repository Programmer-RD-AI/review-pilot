type ReviewComment = {
  body: string;
  path: string;
  line: number;
};
type ReviewComments = {
  reviewComments: Array<ReviewComment>;
  summary: string;
};
enum FileStatus {
  ADDED = 'added',
  REMOVED = 'removed',
  MODIFIED = 'modified',
  RENAMED = 'renamed',
  COPIED = 'copied',
  CHANGED = 'changed',
  UNCHANGED = 'unchanged',
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
export { FileStatus };
