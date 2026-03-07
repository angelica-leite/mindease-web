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
    isLoading,
    error,
    reload,
    addTask,
    moveTask,
    toggleChecklistItem,
  } = useTasksPageViewModel();

  return (
    <div className={styles.page}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>Minhas Tarefas</h1>
        <p className={styles.description}>Organize suas tarefas em etapas simples</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles.columnsGrid}
      >
        {error ? (
          <div className="mindease-card md:col-span-3">
            <p className="text-muted-foreground">Erro ao carregar tarefas: {error}</p>
            <button
              type="button"
              className="mt-3 rounded-lg border px-4 py-2 text-sm font-medium"
              onClick={reload}
            >
              Tentar novamente
            </button>
          </div>
        ) : null}

        {!error && isLoading ? (
          <div className="mindease-card md:col-span-3">
            <p className="text-muted-foreground">Carregando tarefas...</p>
          </div>
        ) : null}

        {!error && !isLoading
          ? columns.map((column) => (
              <TaskColumn
                key={column.status}
                status={column.status}
                tasks={column.tasks}
                onStatusChange={moveTask}
                onChecklistToggle={toggleChecklistItem}
                onAddTask={column.onAddTask}
              />
            ))
          : null}
      </motion.div>

      <AddTaskDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} onAdd={addTask} />
    </div>
  );
}
