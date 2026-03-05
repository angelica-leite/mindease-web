import { ListTasks } from "@/domain/use-cases/list-tasks";
import type { Task } from "@/domain/entities/task";
import type { TaskRepository } from "@/domain/repositories/task-repository";

describe("ListTasks", () => {
  it("returns repository list result", async () => {
    const tasks: Task[] = [
      {
        id: "1",
        title: "T1",
        status: "todo",
        priority: "low",
        createdAt: new Date("2026-01-01T10:00:00.000Z"),
      },
    ];

    const repo: TaskRepository = {
      list: jest.fn(async () => tasks),
      saveAll: jest.fn(),
      add: jest.fn(),
    };

    const useCase = new ListTasks(repo);
    const result = await useCase.execute();

    expect(repo.list).toHaveBeenCalledTimes(1);
    expect(result).toEqual(tasks);
  });
});
