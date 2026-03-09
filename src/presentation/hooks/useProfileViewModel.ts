"use client";

import { useMemo } from "react";

import { useAuth } from "@/presentation/hooks/useAuth";
import { useTasks } from "@/presentation/hooks/useTasks";

export function useProfileViewModel() {
  const { tasks } = useTasks();
  const { profile } = useAuth();

  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === "done").length,
    [tasks],
  );

  const memberSince = useMemo(() => {
    if (!profile?.createdAt) {
      return "Não disponível";
    }

    return new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric",
    }).format(new Date(profile.createdAt));
  }, [profile]);

  return {
    completedTasks,
    profile,
    memberSince,
  };
}
