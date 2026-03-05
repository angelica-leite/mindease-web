"use client";

import { useMemo } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/presentation/lib/utils";

import type { Task, TaskStatus } from "@/domain/entities/task";

const statusActions: Record<TaskStatus, { next: TaskStatus; label: string }> = {
  todo: { next: "in-progress", label: "Iniciar" },
  "in-progress": { next: "done", label: "Concluir" },
  done: { next: "todo", label: "Reabrir" },
};

const priorityColors = {
  low: "border-l-success",
  medium: "border-l-warning",
  high: "border-l-destructive",
} as const;

interface UseTaskCardViewModelParams {
  readonly task: Task;
}

export function useTaskCardViewModel({ task }: UseTaskCardViewModelParams) {
  return useMemo(() => {
    const action = statusActions[task.status];
    const checklist = task.checklist ?? [];
    const hasChecklist = checklist.length > 0;
    const visibleChecklistItems = checklist.slice(0, 3);
    const hiddenChecklistCount = Math.max(checklist.length - 3, 0);

    const checklistProgress = hasChecklist
      ? checklist.filter((item) => item.completed).length / checklist.length
      : null;

    const isDone = task.status === "done";

    return {
      action,
      isDone,
      taskClassName: cn(
        "mindease-card group cursor-pointer border-l-4",
        priorityColors[task.priority],
        isDone && "opacity-70",
      ),
      titleClassName: cn(
        "leading-snug font-medium text-foreground",
        isDone && "line-through text-muted-foreground",
      ),
      hasChecklist,
      visibleChecklistItems,
      hiddenChecklistCount,
      checklistProgress,
      actionButtonClassName: cn(
        "flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
        isDone
          ? "text-muted-foreground hover:bg-muted hover:text-foreground"
          : "text-primary hover:bg-primary/10",
      ),
      actionIcon: isDone ? Circle : CheckCircle2,
      estimatedMinutesLabel: task.estimatedMinutes
        ? `${task.estimatedMinutes} min`
        : null,
    };
  }, [task]);
}
