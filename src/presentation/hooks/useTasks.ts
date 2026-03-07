"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Task, TaskStatus } from "@/domain/entities/task";
import { makeTasks } from "@/infra/di/tasks";

type CreateTaskInput = Omit<Task, "id" | "createdAt">;
const defaultTasksError = "Nao foi possível carregar tarefas.";

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message;
  return defaultTasksError;
}

export function useTasks() {
  const uc = useMemo(() => makeTasks(), []);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loadedTasks = await uc.list.execute();
      setTasks(loadedTasks);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [uc]);

  useEffect(() => {
    void reload();
  }, [reload]);

  const addTask = useCallback(
    async (task: CreateTaskInput) => {
      setError(null);
      try {
        const updated = await uc.add.execute(task);
        setTasks(updated);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    },
    [uc],
  );

  const moveTask = useCallback(
    async (taskId: string, status: TaskStatus) => {
      setError(null);
      try {
        const updated = await uc.move.execute(taskId, status);
        setTasks(updated);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    },
    [uc],
  );

  const toggleChecklistItem = useCallback(
    async (taskId: string, itemId: string) => {
      setError(null);
      try {
        const updated = await uc.toggleChecklist.execute(taskId, itemId);
        setTasks(updated);
      } catch (err) {
        setError(getErrorMessage(err));
      }
    },
    [uc],
  );

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => tasks.filter((t) => t.status === status),
    [tasks],
  );

  return {
    tasks,
    isLoading,
    error,
    reload,
    addTask,
    moveTask,
    toggleChecklistItem,
    getTasksByStatus,
  };
}
