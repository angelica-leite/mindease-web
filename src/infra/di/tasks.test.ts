import { AddTask } from "@/application/tasks/add-tasks";
import { ListTasks } from "@/domain/use-cases/list-tasks";
import { MoveTask } from "@/domain/use-cases/move-task";
import { ToggleChecklistItem } from "@/domain/use-cases/toggle-checklist-item";
import { makeTasks } from "@/infra/di/tasks";

describe("makeTasks", () => {
  it("returns all task use cases wired", () => {
    const result = makeTasks();

    expect(result.add).toBeInstanceOf(AddTask);
    expect(result.list).toBeInstanceOf(ListTasks);
    expect(result.move).toBeInstanceOf(MoveTask);
    expect(result.toggleChecklist).toBeInstanceOf(ToggleChecklistItem);
  });
});
