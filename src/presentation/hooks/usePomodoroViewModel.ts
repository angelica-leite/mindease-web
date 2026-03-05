"use client";

import { useMemo } from "react";
import { Coffee, Brain } from "lucide-react";

import { usePomodoro, type PomodoroPhase } from "@/presentation/hooks/usePomodoro";

type PomodoroController = ReturnType<typeof usePomodoro>;

interface PomodoroPhaseConfig {
  readonly label: string;
  readonly color: string;
  readonly icon: typeof Brain;
}

const circleRadius = 120;
const circleCircumference = 2 * Math.PI * circleRadius;

const phaseConfig: Record<PomodoroPhase, PomodoroPhaseConfig> = {
  idle: {
    label: "Pronto para focar?",
    color: "text-muted-foreground",
    icon: Brain,
  },
  work: { label: "Tempo de Foco", color: "text-focus", icon: Brain },
  shortBreak: { label: "Pausa Curta", color: "text-success", icon: Coffee },
  longBreak: { label: "Pausa Longa", color: "text-primary", icon: Coffee },
};

export function usePomodoroViewModel(controller?: PomodoroController) {
  const internalController = usePomodoro();
  const resolvedController = controller ?? internalController;

  const { phase, progress, completedCycles, isRunning, pause, resume, ...rest } =
    resolvedController;

  const phaseState = phaseConfig[phase];
  const strokeDashoffset = circleCircumference - (progress / 100) * circleCircumference;

  const pauseOrResume = useMemo(() => (isRunning ? pause : resume), [isRunning, pause, resume]);
  const strokeColor = phase === "work" ? "hsl(var(--focus))" : "hsl(var(--success))";
  const showCycleCounter = phase !== "idle";
  const isIdle = phase === "idle";
  const cycleIndicators = Array.from({ length: 4 }, (_, index) => ({
    index,
    done: index < completedCycles % 4,
  }));

  return {
    ...rest,
    phase,
    phaseState,
    progress,
    completedCycles,
    isRunning,
    circleCircumference,
    strokeDashoffset,
    strokeColor,
    isIdle,
    showCycleCounter,
    cycleIndicators,
    pauseOrResume,
    cyclesUntilLongBreak: 4 - (completedCycles % 4),
  };
}
