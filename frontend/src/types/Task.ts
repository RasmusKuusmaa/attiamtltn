export interface Task {
  task_id: number;
  folder_id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string | null;
}
