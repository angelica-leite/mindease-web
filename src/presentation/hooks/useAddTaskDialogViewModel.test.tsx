import { renderHook } from "@testing-library/react";

import { useAddTaskDialogViewModel } from "@/presentation/hooks/useAddTaskDialogViewModel";

describe("useAddTaskDialogViewModel", () => {
  it("returns priority options and selected matcher", () => {
    const { result } = renderHook(() => useAddTaskDialogViewModel("high"));

    expect(result.current.priorityOptions).toHaveLength(3);
    expect(result.current.isPrioritySelected("high")).toBe(true);
    expect(result.current.isPrioritySelected("low")).toBe(false);
  });
});
