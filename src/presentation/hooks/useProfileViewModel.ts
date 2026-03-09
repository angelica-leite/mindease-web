"use client";

import { useMemo } from "react";

import { useAuth } from "@/presentation/hooks/useAuth";
import { useFocusStats } from "@/presentation/hooks/useFocusStats";
import { useTasks } from "@/presentation/hooks/useTasks";

export function useProfileViewModel() {
  const { tasks } = useTasks();
  const { profile } = useAuth();
  const { stats } = useFocusStats(profile?.id);

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

  const totalFocusTime = useMemo(() => {
    const totalMinutes = Math.floor(stats.totalFocusSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
    }

    return `${minutes}m`;
  }, [stats.totalFocusSeconds]);

  return {
    completedTasks,
    profile,
    memberSince,
    completedFocusSessions: stats.completedFocusSessions,
    totalFocusTime,
  };
}
