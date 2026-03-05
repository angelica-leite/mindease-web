import { TaskStatus } from "@/domain/entities/task";
import { TaskRepository } from "@/domain/repositories/task-repository";

export class MoveTask {
  constructor(private repo: TaskRepository) {}

  async execute(taskId: string, status: TaskStatus) {
    const tasks = await this.repo.list();
    const updated = tasks.map((t) => (t.id === taskId ? { ...t, status } : t));
    await this.repo.saveAll(updated);
    return updated;
  }
}
