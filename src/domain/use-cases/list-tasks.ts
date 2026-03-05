import { TaskRepository } from "@/domain/repositories/task-repository";

export class ListTasks {
  constructor(private repo: TaskRepository) {}
  execute() {
    return this.repo.list();
  }
}
