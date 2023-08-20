export interface Task {
    id: number | null;
    title: string;
    description: string;
    createdAt: number;
    completedAt: number | null;
    completed: boolean;
}