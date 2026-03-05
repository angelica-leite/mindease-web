"use client";

import { motion } from "framer-motion";

import { TaskColumn } from "@/presentation/components/tasks/TaskColumn";
import { AddTaskDialog } from "@/presentation/components/tasks/AddTaskDialog";
import { useTasksPageViewModel } from "@/presentation/hooks/useTasksPageViewModel";

export default function TasksClient() {
  const {
    columns,
    isAddDialogOpen,
    setIsAddDialogOpen,
    addTask,
    moveTask,
    toggleChecklistItem,
  } = useTasksPageViewModel();

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-1 text-3xl font-display font-bold text-foreground">
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
        className="grid gap-6 md:grid-cols-3"
      >
        {columns.map((column) => (
          <TaskColumn
            key={column.status}
            status={column.status}
            tasks={column.tasks}
            onStatusChange={moveTask}
            onChecklistToggle={toggleChecklistItem}
            onAddTask={column.onAddTask}
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
