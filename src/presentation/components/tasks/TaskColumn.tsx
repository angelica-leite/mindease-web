"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import type { Task, TaskStatus } from "@/presentation/types/tasks";
import { TaskCard } from "@/presentation/components/tasks/TaskCard";
import { cn } from "@/presentation/lib/utils";
import { useTaskColumnViewModel } from "@/presentation/hooks/useTaskColumnViewModel";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onChecklistToggle: (taskId: string, itemId: string) => void;
  onAddTask?: () => void;
}

export function TaskColumn({
  status,
  tasks,
  onStatusChange,
  onChecklistToggle,
  onAddTask,
}: TaskColumnProps) {
  const {
    styles,
    label,
    taskCountLabel,
    showAddButton,
    addTaskHandler,
    isEmpty,
  } =
    useTaskColumnViewModel({
      status,
      taskCount: tasks.length,
      onAddTask,
    });

  return (
    <div className={cn("rounded-2xl p-4", styles.bg)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("h-3 w-3 rounded-full", styles.accent)} />
          <h2 className="font-display font-semibold text-foreground">{label}</h2>
          <span className="text-sm text-muted-foreground">{taskCountLabel}</span>
        </div>

        {showAddButton && (
          <button
            type="button"
            onClick={addTaskHandler}
            className="flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
          >
            <Plus className="h-4 w-4" />
            Adicionar
          </button>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)}
              onChecklistToggle={(itemId) => onChecklistToggle(task.id, itemId)}
            />
          ))}
        </AnimatePresence>

        {isEmpty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center"
          >
            <p className="text-sm text-muted-foreground">Nenhuma tarefa aqui</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
