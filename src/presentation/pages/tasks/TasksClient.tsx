"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { TaskColumn } from "@/presentation/components/tasks/TaskColumn";
import { AddTaskDialog } from "@/presentation/components/tasks/AddTaskDialog";
import { useTasks } from "@/presentation/hooks/useTasks";
import type { TaskStatus } from "@/presentation/types/tasks";

export default function TasksClient() {
  const { addTask, moveTask, toggleChecklistItem, getTasksByStatus } =
    useTasks();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const columns = useMemo(
    () =>
      [
        { status: "todo" },
        { status: "in-progress" },
        { status: "done" },
      ] satisfies { status: TaskStatus }[],
    [],
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          Minhas Tarefas
        </h1>
        <p className="text-muted-foreground">
          Organize suas tarefas em etapas simples
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            status={column.status}
            tasks={getTasksByStatus(column.status)}
            onStatusChange={moveTask}
            onChecklistToggle={toggleChecklistItem}
            onAddTask={
              column.status === "todo"
                ? () => setIsAddDialogOpen(true)
                : undefined
            }
          />
        ))}
      </motion.div>

      <AddTaskDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={addTask}
      />
    </div>
  );
}
