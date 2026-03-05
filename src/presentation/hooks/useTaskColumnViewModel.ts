"use client";

import { useMemo } from "react";

import type { TaskStatus } from "@/presentation/types/tasks";

const columnStyles: Record<TaskStatus, { bg: string; accent: string }> = {
  todo: { bg: "bg-muted/30", accent: "bg-muted-foreground" },
  "in-progress": { bg: "bg-focus/5", accent: "bg-focus" },
  done: { bg: "bg-success/5", accent: "bg-success" },
};

const columnLabels: Record<TaskStatus, string> = {
  todo: "A Fazer",
  "in-progress": "Em Progresso",
  done: "Concluido",
};

interface UseTaskColumnViewModelParams {
  readonly status: TaskStatus;
  readonly taskCount: number;
  readonly onAddTask?: () => void;
}

export function useTaskColumnViewModel({
  status,
  taskCount,
  onAddTask,
}: UseTaskColumnViewModelParams) {
  return useMemo(
    () => ({
      styles: columnStyles[status],
      label: columnLabels[status],
      taskCountLabel: `(${taskCount})`,
      showAddButton: status === "todo" && Boolean(onAddTask),
      addTaskHandler: onAddTask,
      isEmpty: taskCount === 0,
    }),
    [status, taskCount, onAddTask],
  );
}
