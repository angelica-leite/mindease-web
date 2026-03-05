"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

import type { Task, TaskStatus } from "@/presentation/types/tasks";
import { TaskCard } from "@/presentation/components/tasks/TaskCard";
import { cn } from "@/presentation/lib/utils";
import { useTaskColumnViewModel } from "@/presentation/hooks/useTaskColumnViewModel";
import { taskColumnClasses as classStyles } from "@/presentation/components/tasks/TaskColumn.styles";

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
    styles: columnStyles,
    label,
    taskCountLabel,
    showAddButton,
    addTaskHandler,
    isEmpty,
  } = useTaskColumnViewModel({
    status,
    taskCount: tasks.length,
    onAddTask,
  });

  return (
    <div className={cn(classStyles.root, columnStyles.bg)}>
      <div className={classStyles.header}>
        <div className={classStyles.titleGroup}>
          <div className={cn(classStyles.accentDot, columnStyles.accent)} />
          <h2 className={classStyles.title}>{label}</h2>
          <span className={classStyles.count}>{taskCountLabel}</span>
        </div>

        {showAddButton && (
          <button type="button" onClick={addTaskHandler} className={classStyles.addButton}>
            <Plus className={classStyles.addIcon} />
            Adicionar
          </button>
        )}
      </div>

      <div className={classStyles.tasksStack}>
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
            className={classStyles.emptyState}
          >
            <p className={classStyles.emptyText}>Nenhuma tarefa aqui</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
