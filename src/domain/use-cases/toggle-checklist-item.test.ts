import { ToggleChecklistItem } from "@/domain/use-cases/toggle-checklist-item";
import type { Task } from "@/domain/entities/task";
import type { TaskRepository } from "@/domain/repositories/task-repository";

describe("ToggleChecklistItem", () => {
  it("toggles only the target checklist item and persists all tasks", async () => {
    const tasks: Task[] = [
      {
        id: "task-1",
        title: "A",
        status: "todo",
        priority: "medium",
        createdAt: new Date("2026-01-01T10:00:00.000Z"),
        checklist: [
          { id: "c1", text: "item 1", completed: false },
          { id: "c2", text: "item 2", completed: true },
        ],
      },
      {
        id: "task-2",
        title: "B",
        status: "done",
        priority: "high",
        createdAt: new Date("2026-01-01T10:00:00.000Z"),
      },
    ];

    const repo: TaskRepository = {
      list: jest.fn(async () => tasks),
      saveAll: jest.fn(async () => undefined),
      add: jest.fn(),
    };

    const useCase = new ToggleChecklistItem(repo);
    const result = await useCase.execute("task-1", "c1");

    const updatedTask = result.find((t) => t.id === "task-1");
    expect(updatedTask?.checklist?.find((i) => i.id === "c1")?.completed).toBe(
      true,
    );
    expect(updatedTask?.checklist?.find((i) => i.id === "c2")?.completed).toBe(
      true,
    );
    expect(repo.saveAll).toHaveBeenCalledWith(result);
  });
});
