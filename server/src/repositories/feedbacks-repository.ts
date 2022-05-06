export interface FeedbackCreateData {
    type: string;
    comment: string;
    screenshot?: string;
}

export interface FeedbacksReposirtory {
    create: (data: FeedbackCreateData) => Promise<void>;
}