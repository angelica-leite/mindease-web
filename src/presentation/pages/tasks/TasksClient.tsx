"use client";

import { motion } from "framer-motion";

import { AddTaskDialog } from "@/presentation/components/tasks/AddTaskDialog";
import { useTasksPageViewModel } from "@/presentation/hooks/useTasksPageViewModel";
import { TaskColumn } from "@/presentation/components/tasks/TaskColumn";
import { tasksClientClasses as styles } from "@/presentation/pages/tasks/TasksClient.styles";

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
    <div className={styles.page}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>
          Minhas Tarefas
        </h1>
        <p className={styles.description}>
          Organize suas tarefas em etapas simples
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles.columnsGrid}
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
