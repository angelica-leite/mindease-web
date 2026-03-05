"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

import { usePomodoro } from "@/presentation/hooks/usePomodoro";
import { usePomodoroViewModel } from "@/presentation/hooks/usePomodoroViewModel";
import { Button } from "@/presentation/components/ui/button";
import { cn } from "@/presentation/lib/utils";

type PomodoroController = ReturnType<typeof usePomodoro>;

interface PomodoroTimerProps {
  readonly controller?: PomodoroController;
}

export function PomodoroTimer({ controller }: PomodoroTimerProps) {
  const {
    phaseState,
    formattedTime,
    completedCycles,
    isRunning,
    startWork,
    reset,
    skip,
    pauseOrResume,
    circleCircumference,
    strokeDashoffset,
    strokeColor,
    isIdle,
    showCycleCounter,
    cycleIndicators,
    cyclesUntilLongBreak,
  } = usePomodoroViewModel(controller);
  const Icon = phaseState.icon;

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-8">
        <svg className="h-72 w-72 -rotate-90" viewBox="0 0 260 260">
          <circle
            cx="130"
            cy="130"
            r="120"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />

          <motion.circle
            cx="130"
            cy="130"
            r="120"
            fill="none"
            stroke={strokeColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circleCircumference}
            initial={{ strokeDashoffset: circleCircumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("mb-2", phaseState.color)}>
            <Icon className="h-8 w-8" />
          </div>

          <span className={cn("mb-1 text-sm font-medium", phaseState.color)}>
            {phaseState.label}
          </span>

          <span className="font-display tabular-nums text-5xl font-bold text-foreground">
            {formattedTime}
          </span>

          {showCycleCounter && (
            <span className="mt-2 text-sm text-muted-foreground">
              Ciclo {completedCycles + 1}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isIdle ? (
          <Button
            size="lg"
            onClick={startWork}
            className="mindease-button-primary px-8"
          >
            <Play className="mr-2 h-5 w-5" />
            Iniciar Foco
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={reset}
              className="h-12 w-12 rounded-xl"
              type="button"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>

            <Button
              size="lg"
              onClick={pauseOrResume}
              className={cn(
                "h-14 w-14 rounded-2xl",
                isRunning
                  ? "bg-destructive hover:bg-destructive/90"
                  : "mindease-button-primary",
              )}
              type="button"
            >
              {isRunning ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="ml-0.5 h-6 w-6" />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={skip}
              className="h-12 w-12 rounded-xl"
              type="button"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>

      <div className="mt-8 flex gap-2">
        {cycleIndicators.map((indicator) => (
          <div
            key={indicator.index}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              indicator.done ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        {cyclesUntilLongBreak} ciclos até a pausa longa
      </p>
    </div>
  );
}
