type singleCommentThread = {
    path: string;
    position: number;
    body: string;
};
type multiLineThread = {
    path: string;
    line: number;
    startLine?: number;
    side?: 'LEFT' | 'RIGHT';
    startSide?: 'LEFT' | 'RIGHT';
    body: string;
};
type ReviewComments = {
    summary: string;
    singleCommentThreads: Array<singleCommentThread>;
    multiLineThreads: Array<multiLineThread>;
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
export type { ReviewComments, singleCommentThread, multiLineThread, FileChange };
export { FileStatus };
