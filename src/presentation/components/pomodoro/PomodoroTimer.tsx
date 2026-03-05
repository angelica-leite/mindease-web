"use client";

import { motion } from "framer-motion";
import { Pause, Play, RotateCcw, SkipForward } from "lucide-react";

import { Button } from "@/presentation/components/ui/button";
import { usePomodoro } from "@/presentation/hooks/usePomodoro";
import { usePomodoroViewModel } from "@/presentation/hooks/usePomodoroViewModel";
import { cn } from "@/presentation/lib/utils";
import { pomodoroTimerClasses as styles } from "@/presentation/components/pomodoro/PomodoroTimer.styles";

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
    <div className={styles.root}>
      <div className={styles.clockWrapper}>
        <svg className={styles.svg} viewBox="0 0 260 260">
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

        <div className={styles.centerContent}>
          <div className={cn(styles.phaseIconWrapper, phaseState.color)}>
            <Icon className={styles.phaseIcon} />
          </div>

          <span className={cn(styles.phaseLabel, phaseState.color)}>{phaseState.label}</span>

          <span className={styles.time}>{formattedTime}</span>

          {showCycleCounter && (
            <span className={styles.cycleCounter}>Ciclo {completedCycles + 1}</span>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        {isIdle ? (
          <Button size="lg" onClick={startWork} className={styles.startButton}>
            <Play className={styles.startButtonIcon} />
            Iniciar Foco
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={reset}
              className={styles.sideButton}
              type="button"
            >
              <RotateCcw className={styles.smallIcon} />
            </Button>

            <Button
              size="lg"
              onClick={pauseOrResume}
              className={cn(
                styles.primaryToggleButton,
                isRunning ? styles.runningToggleButton : styles.pausedToggleButton,
              )}
              type="button"
            >
              {isRunning ? (
                <Pause className={styles.largeIcon} />
              ) : (
                <Play className={styles.playOffsetIcon} />
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={skip}
              className={styles.sideButton}
              type="button"
            >
              <SkipForward className={styles.smallIcon} />
            </Button>
          </>
        )}
      </div>

      <div className={styles.indicators}>
        {cycleIndicators.map((indicator) => (
          <div
            key={indicator.index}
            className={cn(
              styles.indicatorBase,
              indicator.done ? styles.indicatorDone : styles.indicatorPending,
            )}
          />
        ))}
      </div>

      <p className={styles.footerText}>{cyclesUntilLongBreak} ciclos ate a pausa longa</p>
    </div>
  );
}
