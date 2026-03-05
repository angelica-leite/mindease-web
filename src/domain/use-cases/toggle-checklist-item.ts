import { TaskRepository } from "@/domain/repositories/task-repository";

export class ToggleChecklistItem {
  constructor(private repo: TaskRepository) {}

  async execute(taskId: string, itemId: string) {
    const tasks = await this.repo.list();
    const updated = tasks.map((t) => {
      if (t.id !== taskId) return t;
      const checklist = (t.checklist ?? []).map((i) =>
        i.id === itemId ? { ...i, completed: !i.completed } : i,
      );
      return { ...t, checklist };
    });

    await this.repo.saveAll(updated);
    return updated;
  }
}
