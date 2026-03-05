import { renderHook } from "@testing-library/react";

import { useCognitiveAlertViewModel } from "@/presentation/hooks/useCognitiveAlertViewModel";

describe("useCognitiveAlertViewModel", () => {
  it("returns break config and showAction=true when action data is complete", () => {
    const { result } = renderHook(() =>
      useCognitiveAlertViewModel({
        type: "break",
        onAction: jest.fn(),
        actionLabel: "Fazer pausa",
      }),
    );

    expect(result.current.showAction).toBe(true);
    expect(result.current.containerClassName).toContain("from-accent");
    expect(result.current.iconContainerClassName).toContain("text-warning");
  });

  it("hides action when callback or label is missing", () => {
    const { result } = renderHook(() =>
      useCognitiveAlertViewModel({
        type: "focus",
      }),
    );

    expect(result.current.showAction).toBe(false);
    expect(result.current.containerClassName).toContain("from-focus/20");
  });
});
