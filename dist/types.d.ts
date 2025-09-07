/**
 * Represents a single review comment on a file
 */
type ReviewComment = {
    /** The file path relative to repository root */
    path: string;
    /** The line position in the diff where the comment applies */
    position: number;
    /** The comment text content */
    body: string;
};
type ReviewComments = {
    summary: string;
    event: ReviewEventTypes;
    comments: Array<ReviewComment>;
};
type ReviewEventTypes = 'APPROVE' | 'COMMENT' | 'REQUEST_CHANGES';
declare enum FileStatus {
    ADDED = "added",
    REMOVED = "removed",
    MODIFIED = "modified",
    RENAMED = "renamed",
    COPIED = "copied",
    CHANGED = "changed",
    UNCHANGED = "unchanged"
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
export type { ReviewComments, ReviewComment, FileChange, Config, ReviewLevel, CustomContext, ReviewEventTypes, };
export { FileStatus };
