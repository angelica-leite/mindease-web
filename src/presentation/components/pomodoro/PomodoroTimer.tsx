"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Coffee,
  Brain,
} from "lucide-react";

import {
  usePomodoro,
  type PomodoroPhase,
} from "@/presentation/hooks/usePomodoro";
import { Button } from "@/presentation/components/ui/button";
import { cn } from "@/presentation/lib/utils";

type PomodoroController = ReturnType<typeof usePomodoro>;

interface PomodoroTimerProps {
  readonly controller?: PomodoroController;
}

const phaseConfig: Record<
  PomodoroPhase,
  {
    label: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
  }
> = {
  idle: {
    label: "Pronto para focar?",
    color: "text-muted-foreground",
    icon: Brain,
  },
  work: { label: "Tempo de Foco", color: "text-focus", icon: Brain },
  shortBreak: { label: "Pausa Curta", color: "text-success", icon: Coffee },
  longBreak: { label: "Pausa Longa", color: "text-primary", icon: Coffee },
};

export function PomodoroTimer({ controller }: PomodoroTimerProps) {
  const internalController = usePomodoro();
  const {
    phase,
    formattedTime,
    isRunning,
    completedCycles,
    progress,
    startWork,
    pause,
    resume,
    reset,
    skip,
  } = controller ?? internalController;

  const config = phaseConfig[phase];
  const Icon = config.icon;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      {/* Timer Circle */}
      <div className="relative mb-8">
        <svg className="w-72 h-72 -rotate-90" viewBox="0 0 260 260">
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
            stroke={
              phase === "work" ? "hsl(var(--focus))" : "hsl(var(--success))"
            }
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={cn("mb-2", config.color)}>
            <Icon className="h-8 w-8" />
          </div>

          <span className={cn("text-sm font-medium mb-1", config.color)}>
            {config.label}
          </span>

          <span className="text-5xl font-display font-bold text-foreground tabular-nums">
            {formattedTime}
          </span>

          {phase !== "idle" && (
            <span className="text-sm text-muted-foreground mt-2">
              Ciclo {completedCycles + 1}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {phase === "idle" ? (
          <Button
            size="lg"
            onClick={startWork}
            className="mindease-button-primary px-8"
          >
            <Play className="h-5 w-5 mr-2" />
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
              onClick={isRunning ? pause : resume}
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
                <Play className="h-6 w-6 ml-0.5" />
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

      {/* Cycle indicators */}
      <div className="flex gap-2 mt-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors",
              i < completedCycles % 4 ? "bg-primary" : "bg-muted",
            )}
          />
        ))}
      </div>

      <p className="text-sm text-muted-foreground mt-3">
        {4 - (completedCycles % 4)} ciclos até a pausa longa
      </p>
    </div>
  );
}
