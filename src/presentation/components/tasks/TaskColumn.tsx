"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import type { Task, TaskStatus } from "@/presentation/types/tasks";
import { TaskCard } from "@/presentation/components/tasks/TaskCard";
import { cn } from "@/presentation/lib/utils";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onChecklistToggle: (taskId: string, itemId: string) => void;
  onAddTask?: () => void;
}

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

export function TaskColumn({
  status,
  tasks,
  onStatusChange,
  onChecklistToggle,
  onAddTask,
}: TaskColumnProps) {
  const styles = columnStyles[status];

  return (
    <div className={cn("rounded-2xl p-4", styles.bg)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn("h-3 w-3 rounded-full", styles.accent)} />
          <h2 className="font-display font-semibold text-foreground">
            {columnLabels[status]}
          </h2>
          <span className="text-sm text-muted-foreground">
            ({tasks.length})
          </span>
        </div>

        {status === "todo" && onAddTask && (
          <button
            type="button"
            onClick={onAddTask}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
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

        {tasks.length === 0 && (
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

