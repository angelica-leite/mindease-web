"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock, Target, Zap } from "lucide-react";

import type { Task } from "@/domain/entities/task";

interface UseQuickStatsViewModelParams {
  readonly tasks: Task[];
}

export function useQuickStatsViewModel({ tasks }: UseQuickStatsViewModelParams) {
  return useMemo(() => {
    const completed = tasks.filter((task) => task.status === "done").length;
    const inProgress = tasks.filter((task) => task.status === "in-progress").length;
    const total = tasks.length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return [
      {
        label: "Concluidas",
        value: completed,
        icon: CheckCircle2,
        color: "text-success",
        bgColor: "bg-success/10",
      },
      {
        label: "Em Progresso",
        value: inProgress,
        icon: Clock,
        color: "text-focus",
        bgColor: "bg-focus/10",
      },
      {
        label: "Total",
        value: total,
        icon: Target,
        color: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        label: "Progresso",
        value: `${completionRate}%`,
        icon: Zap,
        color: "text-warning",
        bgColor: "bg-warning/10",
      },
    ] as const;
  }, [tasks]);
}
