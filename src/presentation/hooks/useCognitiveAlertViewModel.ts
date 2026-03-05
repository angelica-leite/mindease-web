"use client";

import { useMemo } from "react";
import { Coffee, Eye, Wind } from "lucide-react";

type AlertType = "break" | "focus" | "breathe";

interface UseCognitiveAlertViewModelParams {
  readonly type: AlertType;
  readonly onAction?: () => void;
  readonly actionLabel?: string;
}

const alertConfig = {
  break: {
    icon: Coffee,
    gradient: "from-accent to-warning/20",
    iconColor: "text-warning",
  },
  focus: {
    icon: Eye,
    gradient: "from-focus/20 to-primary/10",
    iconColor: "text-focus",
  },
  breathe: {
    icon: Wind,
    gradient: "from-success/20 to-primary/10",
    iconColor: "text-success",
  },
} as const;

export function useCognitiveAlertViewModel({
  type,
  onAction,
  actionLabel,
}: UseCognitiveAlertViewModelParams) {
  return useMemo(() => {
    const config = alertConfig[type];

    return {
      icon: config.icon,
      containerClassName:
        `relative overflow-hidden rounded-2xl border border-border bg-gradient-to-r p-5 ${config.gradient}`,
      iconContainerClassName:
        `flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 ${config.iconColor}`,
      showAction: Boolean(onAction && actionLabel),
    };
  }, [type, onAction, actionLabel]);
}
