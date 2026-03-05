import { LocalTaskRepository } from "@/infra/repositories/local-storage/task-repository.local";
import type { Task } from "@/domain/entities/task";

const KEY = "tasks";

function makeTask(id: string): Task {
  return {
    id,
    title: `Task ${id}`,
    status: "todo",
    priority: "medium",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  };
}

describe("LocalTaskRepository", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns empty list when storage is empty", async () => {
    const repo = new LocalTaskRepository();
    await expect(repo.list()).resolves.toEqual([]);
  });

  it("saves and lists tasks", async () => {
    const repo = new LocalTaskRepository();
    const tasks = [makeTask("1"), makeTask("2")];

    await repo.saveAll(tasks);
    const result = await repo.list();

    expect(result).toHaveLength(2);
    expect(result.map((task) => task.id)).toEqual(["1", "2"]);
    expect(result[0].createdAt).toBe("2026-01-01T10:00:00.000Z");
    expect(window.localStorage.getItem(KEY)).toBeTruthy();
  });

  it("adds task preserving existing tasks", async () => {
    const repo = new LocalTaskRepository();
    await repo.saveAll([makeTask("1")]);

    await repo.add(makeTask("2"));
    const result = await repo.list();

    expect(result.map((task) => task.id)).toEqual(["1", "2"]);
  });
});
