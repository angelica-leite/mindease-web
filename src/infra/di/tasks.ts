import { LocalTaskRepository } from "@/infra/repositories/local-storage/task-repository.local";
import { ListTasks } from "@/domain/use-cases/list-tasks";
import { MoveTask } from "@/domain/use-cases/move-task";
import { ToggleChecklistItem } from "@/domain/use-cases/toggle-checklist-item";
import { AddTask } from "@/application/tasks/add-tasks";

export function makeTasks() {
  const repo = new LocalTaskRepository();
  return {
    add: new AddTask(repo),
    list: new ListTasks(repo),
    move: new MoveTask(repo),
    toggleChecklist: new ToggleChecklistItem(repo),
  };
}
