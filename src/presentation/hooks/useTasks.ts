"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "@/domain/entities/task";
import { makeTasks } from "@/infra/di/tasks";

type CreateTaskInput = Omit<Task, "id" | "createdAt">;

export function useTasks() {
  const uc = useMemo(() => makeTasks(), []);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    uc.list.execute().then(setTasks);
  }, [uc]);

  const addTask = useCallback(
    async (task: CreateTaskInput) => {
      const updated = await uc.add.execute(task);
      setTasks(updated);
    },
    [uc],
  );

  const moveTask = useCallback(
    async (taskId: string, status: TaskStatus) => {
      const updated = await uc.move.execute(taskId, status);
      setTasks(updated);
    },
    [uc],
  );

  const toggleChecklistItem = useCallback(
    async (taskId: string, itemId: string) => {
      const updated = await uc.toggleChecklist.execute(taskId, itemId);
      setTasks(updated);
    },
    [uc],
  );

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => tasks.filter((t) => t.status === status),
    [tasks],
  );

  return { tasks, addTask, moveTask, toggleChecklistItem, getTasksByStatus };
}
