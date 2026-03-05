"use client";

import { useMemo, useState } from "react";

import { useTasks } from "@/presentation/hooks/useTasks";

function getGreetingByHour(hour: number) {
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function useDashboardViewModel() {
  const { tasks, moveTask, toggleChecklistItem, getTasksByStatus } = useTasks();
  const [showAlert, setShowAlert] = useState(true);

  const inProgressTasks = useMemo(
    () => getTasksByStatus("in-progress"),
    [getTasksByStatus],
  );
  const todoTasks = useMemo(() => getTasksByStatus("todo"), [getTasksByStatus]);

  const greeting = useMemo(() => getGreetingByHour(new Date().getHours()), []);
  const topInProgressTasks = useMemo(
    () => inProgressTasks.slice(0, 3),
    [inProgressTasks],
  );
  const topTodoTasks = useMemo(() => todoTasks.slice(0, 3), [todoTasks]);

  return {
    tasks,
    greeting,
    showAlert,
    topInProgressTasks,
    topTodoTasks,
    inProgressCount: inProgressTasks.length,
    todoCount: todoTasks.length,
    dismissAlert: () => setShowAlert(false),
    moveTask,
    toggleChecklistItem,
  };
}
