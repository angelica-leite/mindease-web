import { renderHook } from "@testing-library/react";

import { usePomodoroPageViewModel } from "@/presentation/hooks/usePomodoroPageViewModel";
import { usePomodoro } from "@/presentation/hooks/usePomodoro";

jest.mock("@/presentation/hooks/usePomodoro", () => ({
  usePomodoro: jest.fn(),
}));

const usePomodoroMock = usePomodoro as jest.MockedFunction<typeof usePomodoro>;

describe("usePomodoroPageViewModel", () => {
  it("returns focused mode only when working and running", () => {
    usePomodoroMock.mockReturnValue({
      phase: "work",
      timeLeft: 1200,
      formattedTime: "20:00",
      isRunning: true,
      completedCycles: 1,
      progress: 10,
      startWork: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      reset: jest.fn(),
      skip: jest.fn(),
    });

    const { result } = renderHook(() => usePomodoroPageViewModel());

    expect(result.current.showFocusedMode).toBe(true);
    expect(result.current.tips).toHaveLength(3);
  });

  it("disables focused mode outside active work phase", () => {
    usePomodoroMock.mockReturnValue({
      phase: "shortBreak",
      timeLeft: 120,
      formattedTime: "02:00",
      isRunning: true,
      completedCycles: 1,
      progress: 50,
      startWork: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      reset: jest.fn(),
      skip: jest.fn(),
    });

    const { result } = renderHook(() => usePomodoroPageViewModel());
    expect(result.current.showFocusedMode).toBe(false);
  });
});
