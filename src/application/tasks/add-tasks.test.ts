import { AddTask } from "@/application/tasks/add-tasks";
import type { Task } from "@/domain/entities/task";
import type { TaskRepository } from "@/domain/repositories/task-repository";

describe("AddTask", () => {
  it("creates task with id and createdAt, then returns listed tasks", async () => {
    const added: Task[] = [];
    const repo: TaskRepository = {
      list: jest.fn(async () => added),
      saveAll: jest.fn(),
      add: jest.fn(async (task: Task) => {
        added.push(task);
      }),
    };

    const randomUuidSpy = jest.spyOn(global.crypto, "randomUUID").mockReturnValue("uuid-123");

    const useCase = new AddTask(repo);

    const result = await useCase.execute({
      title: "Nova",
      status: "todo",
      priority: "medium",
    });

    expect(repo.add).toHaveBeenCalledTimes(1);
    expect(repo.add).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "uuid-123",
        title: "Nova",
        status: "todo",
        priority: "medium",
      }),
    );
    expect(result).toHaveLength(1);
    expect(result[0].createdAt).toBeInstanceOf(Date);

    randomUuidSpy.mockRestore();
  });
});
