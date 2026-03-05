import { renderHook } from "@testing-library/react";

import { useTaskCardViewModel } from "@/presentation/hooks/useTaskCardViewModel";
import type { Task } from "@/domain/entities/task";

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: "task-1",
    title: "Task title",
    status: "todo",
    priority: "medium",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
    ...overrides,
  };
}

describe("useTaskCardViewModel", () => {
  it("maps action by status", () => {
    const { result: todoResult } = renderHook(() =>
      useTaskCardViewModel({ task: makeTask({ status: "todo" }) }),
    );
    expect(todoResult.current.action).toEqual({
      next: "in-progress",
      label: "Iniciar",
    });

    const { result: inProgressResult } = renderHook(() =>
      useTaskCardViewModel({ task: makeTask({ status: "in-progress" }) }),
    );
    expect(inProgressResult.current.action).toEqual({
      next: "done",
      label: "Concluir",
    });

    const { result: doneResult } = renderHook(() =>
      useTaskCardViewModel({ task: makeTask({ status: "done" }) }),
    );
    expect(doneResult.current.action).toEqual({
      next: "todo",
      label: "Reabrir",
    });
  });

  it("limits checklist to 3 visible items and computes progress", () => {
    const { result } = renderHook(() =>
      useTaskCardViewModel({
        task: makeTask({
          checklist: [
            { id: "1", text: "A", completed: true },
            { id: "2", text: "B", completed: true },
            { id: "3", text: "C", completed: false },
            { id: "4", text: "D", completed: false },
          ],
        }),
      }),
    );

    expect(result.current.hasChecklist).toBe(true);
    expect(result.current.visibleChecklistItems).toHaveLength(3);
    expect(result.current.hiddenChecklistCount).toBe(1);
    expect(result.current.checklistProgress).toBe(0.5);
  });

  it("returns estimated minutes label only when value is present", () => {
    const { result: withEstimate } = renderHook(() =>
      useTaskCardViewModel({
        task: makeTask({ estimatedMinutes: 45 }),
      }),
    );
    expect(withEstimate.current.estimatedMinutesLabel).toBe("45 min");

    const { result: withoutEstimate } = renderHook(() =>
      useTaskCardViewModel({
        task: makeTask({ estimatedMinutes: undefined }),
      }),
    );
    expect(withoutEstimate.current.estimatedMinutesLabel).toBeNull();
  });
});
