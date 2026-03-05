import { renderHook } from "@testing-library/react";

import { usePomodoroViewModel } from "@/presentation/hooks/usePomodoroViewModel";
import type { usePomodoro } from "@/presentation/hooks/usePomodoro";

type PomodoroController = ReturnType<typeof usePomodoro>;

function makeController(
  overrides: Partial<PomodoroController> = {},
): PomodoroController {
  return {
    phase: "work",
    timeLeft: 1200,
    formattedTime: "20:00",
    isRunning: true,
    completedCycles: 5,
    progress: 25,
    startWork: jest.fn(),
    pause: jest.fn(),
    resume: jest.fn(),
    reset: jest.fn(),
    skip: jest.fn(),
    ...overrides,
  };
}

describe("usePomodoroViewModel", () => {
  it("maps phase state and computed values", () => {
    const controller = makeController();
    const { result } = renderHook(() => usePomodoroViewModel(controller));

    expect(result.current.phaseState.label).toBe("Tempo de Foco");
    expect(result.current.strokeColor).toBe("hsl(var(--focus))");
    expect(result.current.isIdle).toBe(false);
    expect(result.current.showCycleCounter).toBe(true);
    expect(result.current.cyclesUntilLongBreak).toBe(3);
    expect(result.current.cycleIndicators).toHaveLength(4);
    expect(result.current.cycleIndicators[0].done).toBe(true);
    expect(result.current.cycleIndicators[1].done).toBe(false);
  });

  it("exposes pauseOrResume based on running state", () => {
    const pause = jest.fn();
    const resume = jest.fn();

    const running = makeController({ isRunning: true, pause, resume });
    const { result: runningResult } = renderHook(() =>
      usePomodoroViewModel(running),
    );
    runningResult.current.pauseOrResume();
    expect(pause).toHaveBeenCalledTimes(1);

    const paused = makeController({
      isRunning: false,
      pause: jest.fn(),
      resume,
    });
    const { result: pausedResult } = renderHook(() =>
      usePomodoroViewModel(paused),
    );
    pausedResult.current.pauseOrResume();
    expect(resume).toHaveBeenCalledTimes(1);
  });
});
