"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type PomodoroPhase = "work" | "shortBreak" | "longBreak" | "idle";

interface PomodoroSettings {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  cyclesBeforeLongBreak: number;
}

const defaultSettings: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  cyclesBeforeLongBreak: 4,
};

type IntervalId = ReturnType<typeof setInterval>;

export function usePomodoro(settings: Partial<PomodoroSettings> = {}) {
  const config = useMemo(() => ({ ...defaultSettings, ...settings }), [settings]);

  const [phase, setPhase] = useState<PomodoroPhase>("idle");
  const [timeLeft, setTimeLeft] = useState(() => config.workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);

  const intervalRef = useRef<IntervalId | null>(null);

  const getPhaseTime = useCallback(
    (p: PomodoroPhase) => {
      switch (p) {
        case "work":
          return config.workMinutes * 60;
        case "shortBreak":
          return config.shortBreakMinutes * 60;
        case "longBreak":
          return config.longBreakMinutes * 60;
        case "idle":
        default:
          return config.workMinutes * 60;
      }
    },
    [config.workMinutes, config.shortBreakMinutes, config.longBreakMinutes],
  );

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startWork = useCallback(() => {
    clearTimer();
    setPhase("work");
    setTimeLeft(config.workMinutes * 60);
    setIsRunning(true);
  }, [clearTimer, config.workMinutes]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resume = useCallback(() => {
    setIsRunning((prev) => (phase === "idle" ? prev : true));
  }, [phase]);

  const reset = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setPhase("idle");
    setTimeLeft(config.workMinutes * 60);
    setCompletedCycles(0);
  }, [clearTimer, config.workMinutes]);

  const skip = useCallback(() => {
    clearTimer();
    setIsRunning(false);

    setPhase((currentPhase) => {
      if (currentPhase === "work") {
        setCompletedCycles((prevCycles) => {
          const newCycles = prevCycles + 1;

          if (newCycles % config.cyclesBeforeLongBreak === 0) {
            setTimeLeft(config.longBreakMinutes * 60);
            setPhase("longBreak");
          } else {
            setTimeLeft(config.shortBreakMinutes * 60);
            setPhase("shortBreak");
          }

          return newCycles;
        });

        return currentPhase;
      }

      setTimeLeft(config.workMinutes * 60);
      return "work";
    });
  }, [
    clearTimer,
    config.workMinutes,
    config.shortBreakMinutes,
    config.longBreakMinutes,
    config.cyclesBeforeLongBreak,
  ]);

  useEffect(() => {
    if (!isRunning || phase === "idle") {
      clearTimer();
      return;
    }

    clearTimer();

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();

          queueMicrotask(() => skip());
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, phase, clearTimer, skip]);

  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }, [timeLeft]);

  const progress = useMemo(() => {
    if (phase === "idle") return 0;
    const total = getPhaseTime(phase);
    if (total <= 0) return 0;
    return ((total - timeLeft) / total) * 100;
  }, [phase, timeLeft, getPhaseTime]);

  return {
    phase,
    timeLeft,
    formattedTime,
    isRunning,
    completedCycles,
    progress,
    startWork,
    pause,
    resume,
    reset,
    skip,
  };
}
