import type { Task } from "@/domain/entities/task";
import type { TaskRepository } from "@/domain/repositories/task-repository";

export type AddTaskInput = Omit<Task, "id" | "createdAt">;

export class AddTask {
  constructor(private readonly repo: TaskRepository) {}

  async execute(input: AddTaskInput): Promise<Task[]> {
    const task: Task = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };

    await this.repo.add(task);
    return this.repo.list();
  }
}
