export interface Task {
    title: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string | null;
}