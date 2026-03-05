import { MoveTask } from "@/domain/use-cases/move-task";
import type { Task } from "@/domain/entities/task";
import type { TaskRepository } from "@/domain/repositories/task-repository";

function makeTasks(): Task[] {
  return [
    {
      id: "task-1",
      title: "A",
      status: "todo",
      priority: "low",
      createdAt: new Date("2026-01-01T10:00:00.000Z"),
    },
    {
      id: "task-2",
      title: "B",
      status: "in-progress",
      priority: "high",
      createdAt: new Date("2026-01-01T10:00:00.000Z"),
    },
  ];
}

describe("MoveTask", () => {
  it("updates only the matching task status and persists all", async () => {
    const repo: TaskRepository = {
      list: jest.fn(async () => makeTasks()),
      saveAll: jest.fn(async () => undefined),
      add: jest.fn(),
    };

    const useCase = new MoveTask(repo);
    const result = await useCase.execute("task-1", "done");

    expect(result.find((t) => t.id === "task-1")?.status).toBe("done");
    expect(result.find((t) => t.id === "task-2")?.status).toBe("in-progress");
    expect(repo.saveAll).toHaveBeenCalledWith(result);
  });
});
