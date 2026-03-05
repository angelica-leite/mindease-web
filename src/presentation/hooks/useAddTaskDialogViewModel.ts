"use client";

import { useMemo } from "react";

import type { TaskPriority } from "@/presentation/types/tasks";

const priorityOptions: {
  readonly value: TaskPriority;
  readonly label: string;
  readonly color: string;
}[] = [
  { value: "low", label: "Baixa", color: "bg-success" },
  { value: "medium", label: "Media", color: "bg-warning" },
  { value: "high", label: "Alta", color: "bg-destructive" },
];

export function useAddTaskDialogViewModel(selectedPriority: TaskPriority) {
  return useMemo(
    () => ({
      priorityOptions,
      isPrioritySelected: (value: TaskPriority) => value === selectedPriority,
    }),
    [selectedPriority],
  );
}
