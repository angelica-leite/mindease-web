"use client";

import { useMemo, useState } from "react";

import { useTasks } from "@/presentation/hooks/useTasks";
import type { TaskStatus } from "@/presentation/types/tasks";

const taskColumns = [{ status: "todo" }, { status: "in-progress" }, { status: "done" }] satisfies {
  status: TaskStatus;
}[];

export function useTasksPageViewModel() {
  const { addTask, moveTask, toggleChecklistItem, getTasksByStatus, isLoading, error, reload } =
    useTasks();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const columns = useMemo(
    () =>
      taskColumns.map((column) => ({
        ...column,
        tasks: getTasksByStatus(column.status),
        onAddTask: column.status === "todo" ? () => setIsAddDialogOpen(true) : undefined,
      })),
    [getTasksByStatus],
  );

  return {
    columns,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isLoading,
    error,
    reload,
    addTask,
    moveTask,
    toggleChecklistItem,
  };
}
