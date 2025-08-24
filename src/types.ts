type ReviewComment = {
  path: string;
  position: number;
  body: string;
};

type ReviewComments = {
  summary: string;
  event: ReviewEventTypes;
  comments: Array<ReviewComment>;
};

type ReviewEventTypes = 'COMMENT' | 'REQUEST_CHANGES';

enum FileStatus {
  ADDED = 'added',
  REMOVED = 'removed',
  MODIFIED = 'modified',
  RENAMED = 'renamed',
  COPIED = 'copied',
  CHANGED = 'changed',
  UNCHANGED = 'unchanged',
}

type ReviewLevel = 'LOW' | 'MID' | 'HIGH';

type Config = {
  token: string;
  customInstructions: string | undefined;
  apiKey: string;
  model: string;
  level: ReviewLevel;
  maxChanges: number;
};

type FileChange = {
  fileName: string;
  status: FileStatus;
  additions: number;
  deletions: number;
  changes: number;
  diff: string | undefined;
  context: string;
};

type CustomContext = {
  prNodeId: string;
  prDescription: string;
  repoOwner: string;
  repo: string;
  prNumber: number;
};

export type {
  ReviewComments,
  ReviewComment,
  FileChange,
  Config,
  ReviewLevel,
  CustomContext,
  ReviewEventTypes,
};
export { FileStatus };
