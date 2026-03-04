"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Eye, Wind } from "lucide-react";
import { Button } from "@/presentation/components/ui/button";

interface CognitiveAlertProps {
  type: "break" | "focus" | "breathe";
  message: string;
  onDismiss: () => void;
  onAction?: () => void;
  actionLabel?: string;
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

export function CognitiveAlert({
  type,
  message,
  onDismiss,
  onAction,
  actionLabel,
}: Readonly<CognitiveAlertProps>) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${config.gradient} p-5 border border-border`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl bg-background/80 ${config.iconColor}`}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <p className="text-foreground font-medium leading-relaxed">
              {message}
            </p>

            {onAction && actionLabel && (
              <Button
                onClick={onAction}
                variant="secondary"
                size="sm"
                className="mt-3"
              >
                {actionLabel}
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar alerta"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
