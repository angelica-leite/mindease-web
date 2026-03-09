import { act, renderHook } from "@testing-library/react";

import { useFocusStats } from "@/presentation/hooks/useFocusStats";

describe("useFocusStats", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("tracks focus time and sessions per user", () => {
    const { result } = renderHook(() => useFocusStats("user-1"));

    act(() => {
      result.current.addFocusSecond();
      result.current.addFocusSecond();
      result.current.registerCompletedSession();
    });

    expect(result.current.stats.totalFocusSeconds).toBe(2);
    expect(result.current.stats.completedFocusSessions).toBe(1);

    const raw = window.localStorage.getItem("mindease-focus-stats");
    expect(raw).toContain("user-1");
  });

  it("keeps data isolated across users", () => {
    const first = renderHook(() => useFocusStats("user-a"));
    const second = renderHook(() => useFocusStats("user-b"));

    act(() => {
      first.result.current.addFocusSecond();
      first.result.current.registerCompletedSession();
      second.result.current.addFocusSecond();
    });

    expect(first.result.current.stats.completedFocusSessions).toBe(1);
    expect(first.result.current.stats.totalFocusSeconds).toBe(1);
    expect(second.result.current.stats.completedFocusSessions).toBe(0);
    expect(second.result.current.stats.totalFocusSeconds).toBe(1);
  });
});
