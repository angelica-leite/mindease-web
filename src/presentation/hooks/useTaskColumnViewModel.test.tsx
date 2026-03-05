import { renderHook } from "@testing-library/react";

import { useTaskColumnViewModel } from "@/presentation/hooks/useTaskColumnViewModel";

describe("useTaskColumnViewModel", () => {
  it("shows add button only for todo when callback is provided", () => {
    const onAddTask = jest.fn();

    const { result: todoResult } = renderHook(() =>
      useTaskColumnViewModel({ status: "todo", taskCount: 2, onAddTask }),
    );
    expect(todoResult.current.showAddButton).toBe(true);
    expect(todoResult.current.taskCountLabel).toBe("(2)");
    expect(todoResult.current.label).toBe("A Fazer");

    const { result: doneResult } = renderHook(() =>
      useTaskColumnViewModel({ status: "done", taskCount: 0, onAddTask }),
    );
    expect(doneResult.current.showAddButton).toBe(false);
    expect(doneResult.current.isEmpty).toBe(true);
  });
});
