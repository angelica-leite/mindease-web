import { act, renderHook, waitFor } from "@testing-library/react";

import { usePomodoro } from "@/presentation/hooks/usePomodoro";

describe("usePomodoro", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("starts with idle phase and default work time", () => {
    const { result } = renderHook(() => usePomodoro());

    expect(result.current.phase).toBe("idle");
    expect(result.current.timeLeft).toBe(25 * 60);
    expect(result.current.formattedTime).toBe("25:00");
    expect(result.current.isRunning).toBe(false);
  });

  it("starts work, pauses, resumes and resets", () => {
    const { result } = renderHook(() => usePomodoro({ workMinutes: 10, shortBreakMinutes: 2 }));

    act(() => {
      result.current.startWork();
    });
    expect(result.current.phase).toBe("work");
    expect(result.current.timeLeft).toBe(10 * 60);
    expect(result.current.isRunning).toBe(true);

    act(() => {
      result.current.pause();
    });
    expect(result.current.isRunning).toBe(false);

    act(() => {
      result.current.resume();
    });
    expect(result.current.isRunning).toBe(true);

    act(() => {
      result.current.reset();
    });
    expect(result.current.phase).toBe("idle");
    expect(result.current.timeLeft).toBe(10 * 60);
    expect(result.current.completedCycles).toBe(0);
    expect(result.current.isRunning).toBe(false);
  });

  it("does not resume when phase is idle", () => {
    const { result } = renderHook(() => usePomodoro());

    act(() => {
      result.current.resume();
    });

    expect(result.current.isRunning).toBe(false);
  });

  it("skips phases and reaches long break by cycle config", () => {
    const { result } = renderHook(() =>
      usePomodoro({
        workMinutes: 1,
        shortBreakMinutes: 2,
        longBreakMinutes: 3,
        cyclesBeforeLongBreak: 2,
      }),
    );

    act(() => {
      result.current.startWork();
      result.current.skip();
    });
    expect(result.current.phase).toBe("shortBreak");
    expect(result.current.timeLeft).toBe(2 * 60);
    expect(result.current.completedCycles).toBe(1);

    act(() => {
      result.current.skip();
    });
    expect(result.current.phase).toBe("work");
    expect(result.current.timeLeft).toBe(1 * 60);
    expect(result.current.completedCycles).toBe(1);

    act(() => {
      result.current.skip();
    });
    expect(result.current.phase).toBe("longBreak");
    expect(result.current.timeLeft).toBe(3 * 60);
    expect(result.current.completedCycles).toBe(2);
  });

  it("auto-advances when timer reaches zero", async () => {
    const { result } = renderHook(() =>
      usePomodoro({
        workMinutes: 0.05,
        shortBreakMinutes: 0.05,
      }),
    );

    act(() => {
      result.current.startWork();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    await act(async () => {
      await Promise.resolve();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("shortBreak");
      expect(result.current.completedCycles).toBe(1);
      expect(result.current.isRunning).toBe(false);
      expect(result.current.timeLeft).toBe(3);
    });
  });
});
