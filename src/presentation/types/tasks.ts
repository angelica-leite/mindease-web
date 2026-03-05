export type TaskStatus = "todo" | "in-progress" | "done";
export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  checklist?: ChecklistItem[];
  dueDate?: Date;
  createdAt: Date;
  estimatedMinutes?: number;
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TaskColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}
