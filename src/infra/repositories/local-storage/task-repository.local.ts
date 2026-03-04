import { Task } from "@/domain/entities/task";
import { TaskRepository } from "@/domain/repositories/task-repository";

const KEY = "tasks";

export class LocalTaskRepository implements TaskRepository {
  async list(): Promise<Task[]> {
    if (typeof window === "undefined") return [];
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Task[]) : [];
  }

  async saveAll(tasks: Task[]): Promise<void> {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(KEY, JSON.stringify(tasks));
  }

  async add(task: Task): Promise<void> {
    const tasks = await this.list();
    await this.saveAll([...tasks, task]);
  }
}
