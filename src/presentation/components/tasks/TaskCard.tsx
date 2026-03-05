"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, GripVertical } from "lucide-react";

import type { Task, TaskStatus } from "@/domain/entities/task";
import { cn } from "@/presentation/lib/utils";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { useTaskCardViewModel } from "@/presentation/hooks/useTaskCardViewModel";
import { taskCardClasses as styles } from "@/presentation/components/tasks/TaskCard.styles";

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
      <div className={styles.content}>
        <div className={styles.dragHandle}>
          <GripVertical className={styles.dragIcon} />
        </div>

        <div className={styles.body}>
          <div className={styles.header}>
            <h3 className={titleClassName}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className={styles.description}>
              {task.description}
            </p>
          )}

          {hasChecklist && (
            <div className={styles.checklist}>
              {visibleChecklistItems.map((item) => (
                <div key={item.id} className={styles.checklistItem}>
                  <Checkbox
                    id={item.id}
                    checked={item.completed}
                    onCheckedChange={() => onChecklistToggle(item.id)}
                    className={styles.checklistCheckbox}
                  />
                  <label
                    htmlFor={item.id}
                    className={cn(
                      styles.checklistLabelBase,
                      item.completed
                        ? styles.checklistLabelDone
                        : styles.checklistLabelPending,
                    )}
                  >
                    {item.text}
                  </label>
                </div>
              ))}

              {hiddenChecklistCount > 0 && (
                <p className={styles.hiddenCount}>
                  +{hiddenChecklistCount} itens
                </p>
              )}

              {checklistProgress !== null && (
                <div className={styles.progressTrack}>
                  <motion.div
                    className={styles.progressFill}
                    initial={{ width: 0 }}
                    animate={{ width: `${checklistProgress * 100}%` }}
                  />
                </div>
              )}
            </div>
          )}

          <div className={styles.footer}>
            {estimatedMinutesLabel ? (
              <div className={styles.estimate}>
                <Clock className={styles.estimateIcon} />
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
              <ActionIcon className={styles.actionIcon} />
              {action.label}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
