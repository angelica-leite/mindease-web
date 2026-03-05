"use client";

import { useMemo } from "react";

import { useTasks } from "@/presentation/hooks/useTasks";

export function useProfileViewModel() {
  const { tasks } = useTasks();

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "done").length,
    [tasks],
  );

  return {
    completedTasks,
  };
}
