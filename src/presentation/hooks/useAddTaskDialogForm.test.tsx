import { act, renderHook } from "@testing-library/react";
import type { FormEvent } from "react";

import { useAddTaskDialogForm } from "@/presentation/hooks/useAddTaskDialogForm";

describe("useAddTaskDialogForm", () => {
  it("does not submit when title is empty after trim", () => {
    const onAdd = jest.fn();
    const onOpenChange = jest.fn();

    const { result } = renderHook(() => useAddTaskDialogForm({ onAdd, onOpenChange }));

    act(() => {
      result.current.setTitle("   ");
    });

    const preventDefault = jest.fn();

    act(() => {
      result.current.submit({
        preventDefault,
      } as unknown as FormEvent<HTMLFormElement>);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(onAdd).not.toHaveBeenCalled();
    expect(onOpenChange).not.toHaveBeenCalled();
  });

  it("submits sanitized payload and closes dialog", () => {
    const onAdd = jest.fn();
    const onOpenChange = jest.fn();

    const { result } = renderHook(() => useAddTaskDialogForm({ onAdd, onOpenChange }));

    act(() => {
      result.current.setTitle("  Revisar PR  ");
      result.current.setDescription("  Ajustar testes  ");
      result.current.setPriority("high");
      result.current.setEstimatedMinutes("25.9");
    });

    act(() => {
      result.current.submit({
        preventDefault: jest.fn(),
      } as unknown as FormEvent<HTMLFormElement>);
    });

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith({
      title: "Revisar PR",
      description: "Ajustar testes",
      status: "todo",
      priority: "high",
      estimatedMinutes: 25,
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(result.current.title).toBe("");
    expect(result.current.description).toBe("");
    expect(result.current.priority).toBe("medium");
    expect(result.current.estimatedMinutes).toBe("");
  });
});
