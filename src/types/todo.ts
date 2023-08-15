export interface Task {
    id: number;
    title: string;
    description: string;
    createdAt: number;
    completedAt?: number;
    completed: boolean;
}