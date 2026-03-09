import { act, renderHook } from "@testing-library/react";

import { useAccessibilityPanelViewModel } from "@/presentation/hooks/useAccessibilityPanelViewModel";
import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";

jest.mock("@/presentation/contexts/AccessibilityContext", () => ({
  useAccessibility: jest.fn(),
}));

const useAccessibilityMock = useAccessibility as jest.MockedFunction<typeof useAccessibility>;

describe("useAccessibilityPanelViewModel", () => {
  it("exposes complexity and detail options", () => {
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

    const { result } = renderHook(() => useAccessibilityPanelViewModel());

    expect(result.current.complexityLevels.map((item) => item.value)).toEqual([
      "low",
      "medium",
      "high",
    ]);
    expect(result.current.detailLevels.map((item) => item.value)).toEqual(["summary", "detailed"]);
  });

  it("updates complexity and detail preferences", () => {
    const updateSettings = jest.fn();
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
      updateSettings,
    });

    const { result } = renderHook(() => useAccessibilityPanelViewModel());

    act(() => {
      result.current.setComplexityLevel("low");
      result.current.setDetailLevel("summary");
    });

    expect(updateSettings).toHaveBeenCalledWith({ complexityLevel: "low" });
    expect(updateSettings).toHaveBeenCalledWith({ detailLevel: "summary" });
  });

  it("syncs complexity/detail when simplified view is toggled", () => {
    const updateSettings = jest.fn();
    useAccessibilityMock.mockReturnValue({
      settings: {
        fontSize: "medium",
        contrast: "normal",
        spacing: "comfortable",
        complexityLevel: "high",
        detailLevel: "detailed",
        reducedMotion: false,
        simplifiedView: false,
      },
      updateSettings,
    });

    const { result } = renderHook(() => useAccessibilityPanelViewModel());

    act(() => {
      result.current.setSimplifiedView(true);
    });

    expect(updateSettings).toHaveBeenCalledWith({
      simplifiedView: true,
      complexityLevel: "low",
      detailLevel: "summary",
    });

    act(() => {
      result.current.setSimplifiedView(false);
    });

    expect(updateSettings).toHaveBeenCalledWith({
      simplifiedView: false,
      complexityLevel: "medium",
      detailLevel: "detailed",
    });
  });
});
