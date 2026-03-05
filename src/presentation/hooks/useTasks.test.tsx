import { act, renderHook, waitFor } from "@testing-library/react";

import { useTasks } from "@/presentation/hooks/useTasks";
import { makeTasks } from "@/infra/di/tasks";
import type { Task } from "@/domain/entities/task";

jest.mock("@/infra/di/tasks", () => ({
  makeTasks: jest.fn(),
}));

const makeTasksMock = makeTasks as jest.MockedFunction<typeof makeTasks>;

const tasksFixture: Task[] = [
  {
    id: "1",
    title: "T1",
    status: "todo",
    priority: "low",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "2",
    title: "T2",
    status: "done",
    priority: "high",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
];

describe("useTasks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads tasks on mount", async () => {
    const uc = {
      list: { execute: jest.fn(async () => tasksFixture) },
      add: { execute: jest.fn() },
      move: { execute: jest.fn() },
      toggleChecklist: { execute: jest.fn() },
    };
    makeTasksMock.mockReturnValue(uc as unknown as ReturnType<typeof makeTasks>);

    const { result } = renderHook(() => useTasks());

    await waitFor(() => {
      expect(result.current.tasks).toEqual(tasksFixture);
    });
    expect(uc.list.execute).toHaveBeenCalledTimes(1);
  });

  it("delegates add, move and toggle operations and updates state", async () => {
    const afterAdd = [...tasksFixture, { ...tasksFixture[0], id: "3" }];
    const afterMove = [{ ...tasksFixture[0], status: "in-progress" }, tasksFixture[1]];
    const afterToggle = [
      {
        ...tasksFixture[0],
        checklist: [{ id: "c1", text: "x", completed: true }],
      },
      tasksFixture[1],
    ];

    const uc = {
      list: { execute: jest.fn(async () => tasksFixture) },
      add: { execute: jest.fn(async () => afterAdd) },
      move: { execute: jest.fn(async () => afterMove) },
      toggleChecklist: { execute: jest.fn(async () => afterToggle) },
    };
    makeTasksMock.mockReturnValue(uc as unknown as ReturnType<typeof makeTasks>);

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.tasks).toEqual(tasksFixture));

    await act(async () => {
      await result.current.addTask({
        title: "new",
        status: "todo",
        priority: "medium",
      });
    });
    expect(uc.add.execute).toHaveBeenCalledTimes(1);
    expect(result.current.tasks).toEqual(afterAdd);

    await act(async () => {
      await result.current.moveTask("1", "in-progress");
    });
    expect(uc.move.execute).toHaveBeenCalledWith("1", "in-progress");
    expect(result.current.tasks).toEqual(afterMove);

    await act(async () => {
      await result.current.toggleChecklistItem("1", "c1");
    });
    expect(uc.toggleChecklist.execute).toHaveBeenCalledWith("1", "c1");
    expect(result.current.tasks).toEqual(afterToggle);
  });

  it("filters tasks by status", async () => {
    const uc = {
      list: { execute: jest.fn(async () => tasksFixture) },
      add: { execute: jest.fn() },
      move: { execute: jest.fn() },
      toggleChecklist: { execute: jest.fn() },
    };
    makeTasksMock.mockReturnValue(uc as unknown as ReturnType<typeof makeTasks>);

    const { result } = renderHook(() => useTasks());
    await waitFor(() => expect(result.current.tasks).toHaveLength(2));

    expect(result.current.getTasksByStatus("todo").map((task) => task.id)).toEqual([
      "1",
    ]);
    expect(result.current.getTasksByStatus("done").map((task) => task.id)).toEqual([
      "2",
    ]);
  });
});
