import { act, renderHook } from "@testing-library/react";

import { useTasksPageViewModel } from "@/presentation/hooks/useTasksPageViewModel";
import { useTasks } from "@/presentation/hooks/useTasks";
import type { Task } from "@/domain/entities/task";

jest.mock("@/presentation/hooks/useTasks", () => ({
  useTasks: jest.fn(),
}));

const useTasksMock = useTasks as jest.MockedFunction<typeof useTasks>;

const tasksFixture: Task[] = [
  {
    id: "1",
    title: "Todo",
    status: "todo",
    priority: "low",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "2",
    title: "Done",
    status: "done",
    priority: "high",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
];

describe("useTasksPageViewModel", () => {
  beforeEach(() => {
    useTasksMock.mockReturnValue({
      tasks: tasksFixture,
      addTask: jest.fn(),
      moveTask: jest.fn(),
      toggleChecklistItem: jest.fn(),
      getTasksByStatus: (status) => tasksFixture.filter((task) => task.status === status),
    });
  });

  it("builds columns with filtered tasks and opens add dialog from todo column", () => {
    const { result } = renderHook(() => useTasksPageViewModel());

    expect(result.current.columns).toHaveLength(3);
    expect(result.current.columns[0].status).toBe("todo");
    expect(result.current.columns[0].tasks.map((task) => task.id)).toEqual(["1"]);
    expect(result.current.columns[1].tasks).toEqual([]);
    expect(result.current.columns[2].tasks.map((task) => task.id)).toEqual(["2"]);

    expect(result.current.isAddDialogOpen).toBe(false);

    act(() => {
      result.current.columns[0].onAddTask?.();
    });

    expect(result.current.isAddDialogOpen).toBe(true);
  });
});
