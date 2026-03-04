"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle2, Circle, GripVertical } from "lucide-react";

import type { Task, TaskStatus } from "@/domain/entities/task";
import { cn } from "@/presentation/lib/utils";
import { Checkbox } from "@/presentation/components/ui/checkbox";

interface TaskCardProps {
  task: Task;
  onStatusChange: (status: TaskStatus) => void;
  onChecklistToggle: (itemId: string) => void;
}

const priorityColors = {
  low: "border-l-success",
  medium: "border-l-warning",
  high: "border-l-destructive",
} as const;

const statusActions: Record<TaskStatus, { next: TaskStatus; label: string }> = {
  todo: { next: "in-progress", label: "Iniciar" },
  "in-progress": { next: "done", label: "Concluir" },
  done: { next: "todo", label: "Reabrir" },
};

export function TaskCard({
  task,
  onStatusChange,
  onChecklistToggle,
}: Readonly<TaskCardProps>) {
  const { next, label } = statusActions[task.status];

  const checklistProgress =
    task.checklist && task.checklist.length > 0
      ? task.checklist.filter((item) => item.completed).length /
        task.checklist.length
      : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={cn(
        "mindease-card border-l-4 cursor-pointer group",
        priorityColors[task.priority],
        task.status === "done" && "opacity-70",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className={cn(
                "font-medium text-foreground leading-snug",
                task.status === "done" && "line-through text-muted-foreground",
              )}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {task.checklist && task.checklist.length > 0 && (
            <div className="space-y-2 mb-3">
              {task.checklist.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => onChecklistToggle(item.id)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor={item.id}
                    className={cn(
                      "text-sm cursor-pointer",
                      item.completed
                        ? "text-muted-foreground line-through"
                        : "text-foreground",
                    )}
                  >
                    {item.text}
                  </label>
                </div>
              ))}

              {task.checklist.length > 3 && (
                <p className="text-xs text-muted-foreground">
                  +{task.checklist.length - 3} itens
                </p>
              )}

              {checklistProgress !== null && (
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-success rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${checklistProgress * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border">
            {task.estimatedMinutes ? (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{task.estimatedMinutes} min</span>
              </div>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={() => onStatusChange(next)}
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors",
                task.status === "done"
                  ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                  : "text-primary hover:bg-primary/10",
              )}
            >
              {task.status === "done" ? (
                <Circle className="h-3.5 w-3.5" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              {label}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
