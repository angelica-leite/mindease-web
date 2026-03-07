import { act, renderHook } from "@testing-library/react";

import { useDashboardViewModel } from "@/presentation/hooks/useDashboardViewModel";
import { useTasks } from "@/presentation/hooks/useTasks";
import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";
import type { Task } from "@/domain/entities/task";

jest.mock("@/presentation/hooks/useTasks", () => ({
  useTasks: jest.fn(),
}));
jest.mock("@/presentation/contexts/AccessibilityContext", () => ({
  useAccessibility: jest.fn(),
}));

const useTasksMock = useTasks as jest.MockedFunction<typeof useTasks>;
const useAccessibilityMock = useAccessibility as jest.MockedFunction<typeof useAccessibility>;

const tasks: Task[] = [
  {
    id: "1",
    title: "A",
    status: "in-progress",
    priority: "low",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "2",
    title: "B",
    status: "todo",
    priority: "medium",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "3",
    title: "C",
    status: "in-progress",
    priority: "high",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "4",
    title: "D",
    status: "todo",
    priority: "high",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
];

describe("useDashboardViewModel", () => {
  beforeEach(() => {
    useAccessibilityMock.mockReturnValue({
      settings: {
        fontSize: "medium",
        contrast: "normal",
        spacing: "comfortable",
        complexityLevel: "medium",
        detailLevel: "detailed",
        reducedMotion: false,
        simplifiedView: false,
      },
      updateSettings: jest.fn(),
    });

    useTasksMock.mockReturnValue({
      tasks,
      isLoading: false,
      error: null,
      reload: jest.fn(),
      addTask: jest.fn(),
      moveTask: jest.fn(),
      toggleChecklistItem: jest.fn(),
      getTasksByStatus: (status) => tasks.filter((task) => task.status === status),
    });
  });

  it("builds dashboard sections and dismisses alert", () => {
    const hourSpy = jest.spyOn(Date.prototype, "getHours").mockReturnValue(9);
    const { result } = renderHook(() => useDashboardViewModel());

    expect(result.current.greeting).toBe("Bom dia");
    expect(result.current.inProgressCount).toBe(2);
    expect(result.current.todoCount).toBe(2);
    expect(result.current.topInProgressTasks).toHaveLength(2);
    expect(result.current.topTodoTasks).toHaveLength(2);
    expect(result.current.showAlert).toBe(true);

    act(() => {
      result.current.dismissAlert();
    });
    expect(result.current.showAlert).toBe(false);

    hourSpy.mockRestore();
  });

  it("keeps move and checklist handlers from task hook", () => {
    const moveTask = jest.fn();
    const toggleChecklistItem = jest.fn();

    useTasksMock.mockReturnValue({
      tasks,
      isLoading: false,
      error: null,
      reload: jest.fn(),
      addTask: jest.fn(),
      moveTask,
      toggleChecklistItem,
      getTasksByStatus: (status) => tasks.filter((task) => task.status === status),
    });

    const { result } = renderHook(() => useDashboardViewModel());

    result.current.moveTask("1", "done");
    result.current.toggleChecklistItem("1", "item-1");

    expect(moveTask).toHaveBeenCalledWith("1", "done");
    expect(toggleChecklistItem).toHaveBeenCalledWith("1", "item-1");
  });

  it("uses complexity level to control visible task count", () => {
    useAccessibilityMock.mockReturnValue({
      settings: {
        fontSize: "medium",
        contrast: "normal",
        spacing: "comfortable",
        complexityLevel: "low",
        detailLevel: "detailed",
        reducedMotion: false,
        simplifiedView: false,
      },
      updateSettings: jest.fn(),
    });

    const { result } = renderHook(() => useDashboardViewModel());

    expect(result.current.topInProgressTasks).toHaveLength(1);
    expect(result.current.topTodoTasks).toHaveLength(1);
  });
});
