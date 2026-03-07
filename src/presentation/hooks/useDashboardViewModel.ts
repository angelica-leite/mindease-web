"use client";

import { useMemo, useState } from "react";

import { useTasks } from "@/presentation/hooks/useTasks";
import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";

function getGreetingByHour(hour: number) {
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function useDashboardViewModel() {
  const { tasks, isLoading, error, reload, moveTask, toggleChecklistItem, getTasksByStatus } =
    useTasks();
  const { settings } = useAccessibility();
  const [showAlert, setShowAlert] = useState(true);

  const inProgressTasks = useMemo(() => getTasksByStatus("in-progress"), [getTasksByStatus]);
  const todoTasks = useMemo(() => getTasksByStatus("todo"), [getTasksByStatus]);

  const greeting = useMemo(() => getGreetingByHour(new Date().getHours()), []);
  const maxVisibleTasksByLevel = useMemo(
    () =>
      ({
        low: 1,
        medium: 3,
        high: 5,
      })[settings.complexityLevel],
    [settings.complexityLevel],
  );
  const topInProgressTasks = useMemo(
    () => inProgressTasks.slice(0, maxVisibleTasksByLevel),
    [inProgressTasks, maxVisibleTasksByLevel],
  );
  const topTodoTasks = useMemo(
    () => todoTasks.slice(0, maxVisibleTasksByLevel),
    [todoTasks, maxVisibleTasksByLevel],
  );

  return {
    tasks,
    isLoading,
    error,
    reload,
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
