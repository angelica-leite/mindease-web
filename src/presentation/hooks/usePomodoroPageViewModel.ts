"use client";

import { Brain, Heart, Leaf } from "lucide-react";

import { useAuth } from "@/presentation/hooks/useAuth";
import { useFocusStats } from "@/presentation/hooks/useFocusStats";
import { usePomodoro } from "@/presentation/hooks/usePomodoro";

const pomodoroTips = [
  {
    icon: Brain,
    title: "Foco em uma coisa",
    description: "Escolha uma tarefa por vez para reduzir sobrecarga",
  },
  {
    icon: Heart,
    title: "Pause sem culpa",
    description: "Pausas são essenciais para manter a produtividade",
  },
  {
    icon: Leaf,
    title: "Respire",
    description: "Inspire 4s, segure 4s, expire 4s entre ciclos",
  },
] as const;

export function usePomodoroPageViewModel() {
  const { profile } = useAuth();
  const { addFocusSecond, registerCompletedSession } = useFocusStats(profile?.id);
  const controller = usePomodoro(
    {},
    {
      onWorkTick: addFocusSecond,
      onWorkSessionCompleted: registerCompletedSession,
    },
  );
  const showFocusedMode = controller.phase === "work" && controller.isRunning;

  return {
    controller,
    showFocusedMode,
    tips: pomodoroTips,
  };
}
