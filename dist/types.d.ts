type ReviewComment = {
    path: string;
    position: number;
    body: string;
};
type ReviewComments = {
    summary: string;
    event: 'COMMENT' | 'REQUEST_CHANGES';
    comments: Array<ReviewComment>;
};
declare enum FileStatus {
    ADDED = "added",
    REMOVED = "removed",
    MODIFIED = "modified",
    RENAMED = "renamed",
    COPIED = "copied",
    CHANGED = "changed",
    UNCHANGED = "unchanged"
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
