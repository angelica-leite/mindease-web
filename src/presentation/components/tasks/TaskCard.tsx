"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, GripVertical } from "lucide-react";

import type { Task, TaskStatus } from "@/domain/entities/task";
import { cn } from "@/presentation/lib/utils";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { useTaskCardViewModel } from "@/presentation/hooks/useTaskCardViewModel";

interface TaskCardProps {
  task: Task;
  onStatusChange: (status: TaskStatus) => void;
  onChecklistToggle: (itemId: string) => void;
}

export function TaskCard({
  task,
  onStatusChange,
  onChecklistToggle,
}: Readonly<TaskCardProps>) {
  const {
    action,
    hasChecklist,
    visibleChecklistItems,
    hiddenChecklistCount,
    checklistProgress,
    taskClassName,
    titleClassName,
    actionButtonClassName,
    actionIcon: ActionIcon,
    estimatedMinutesLabel,
  } = useTaskCardViewModel({ task });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      className={taskClassName}
    >
      <div className="flex items-start gap-3">
        <div className="cursor-grab opacity-0 transition-opacity group-hover:opacity-100">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3
              className={titleClassName}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
              {task.description}
            </p>
          )}

          {hasChecklist && (
            <div className="mb-3 space-y-2">
              {visibleChecklistItems.map((item) => (
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
                      "cursor-pointer text-sm",
                      item.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground",
                    )}
                  >
                    {item.text}
                  </label>
                </div>
              ))}

              {hiddenChecklistCount > 0 && (
                <p className="text-xs text-muted-foreground">
                  +{hiddenChecklistCount} itens
                </p>
              )}

              {checklistProgress !== null && (
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-success"
                    initial={{ width: 0 }}
                    animate={{ width: `${checklistProgress * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-border pt-2">
            {estimatedMinutesLabel ? (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                <span>{estimatedMinutesLabel}</span>
              </div>
            ) : (
              <span />
            )}

            <button
              type="button"
              onClick={() => onStatusChange(action.next)}
              className={actionButtonClassName}
            >
              <ActionIcon className="h-3.5 w-3.5" />
              {action.label}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
