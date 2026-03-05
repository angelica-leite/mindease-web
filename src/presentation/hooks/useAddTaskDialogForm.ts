"use client";

import { useCallback, useMemo, useState, type FormEvent } from "react";

import type { Task, TaskPriority } from "@/presentation/types/tasks";

interface UseAddTaskDialogFormParams {
  readonly onAdd: (task: Omit<Task, "id" | "createdAt">) => void;
  readonly onOpenChange: (open: boolean) => void;
}

const defaultPriority: TaskPriority = "medium";

export function useAddTaskDialogForm({
  onAdd,
  onOpenChange,
}: UseAddTaskDialogFormParams) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(defaultPriority);
  const [estimatedMinutes, setEstimatedMinutes] = useState("");

  const resetForm = useCallback(() => {
    setTitle("");
    setDescription("");
    setPriority(defaultPriority);
    setEstimatedMinutes("");
  }, []);

  const closeDialog = useCallback(() => onOpenChange(false), [onOpenChange]);

  const submit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const safeTitle = title.trim();
      if (!safeTitle) return;

      const minutes = estimatedMinutes ? Number(estimatedMinutes) : undefined;
      const safeMinutes =
        minutes && Number.isFinite(minutes) && minutes > 0
          ? Math.trunc(minutes)
          : undefined;

      onAdd({
        title: safeTitle,
        description: description.trim() || undefined,
        status: "todo",
        priority,
        estimatedMinutes: safeMinutes,
      });

      resetForm();
      closeDialog();
    },
    [title, estimatedMinutes, onAdd, description, priority, resetForm, closeDialog],
  );

  return useMemo(
    () => ({
      title,
      setTitle,
      description,
      setDescription,
      priority,
      setPriority,
      estimatedMinutes,
      setEstimatedMinutes,
      submit,
      closeDialog,
    }),
    [
      title,
      description,
      priority,
      estimatedMinutes,
      submit,
      closeDialog,
    ],
  );
}
