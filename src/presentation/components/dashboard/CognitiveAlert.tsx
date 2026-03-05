"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/presentation/components/ui/button";
import { useCognitiveAlertViewModel } from "@/presentation/hooks/useCognitiveAlertViewModel";

interface CognitiveAlertProps {
  type: "break" | "focus" | "breathe";
  message: string;
  onDismiss: () => void;
  onAction?: () => void;
  actionLabel?: string;
}

export function CognitiveAlert({
  type,
  message,
  onDismiss,
  onAction,
  actionLabel,
}: Readonly<CognitiveAlertProps>) {
  const {
    icon: Icon,
    containerClassName,
    iconContainerClassName,
    showAction,
  } = useCognitiveAlertViewModel({ type, onAction, actionLabel });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={containerClassName}
      >
        <div className="flex items-start gap-4">
          <div className={iconContainerClassName}>
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <p className="font-medium leading-relaxed text-foreground">{message}</p>

            {showAction && onAction && actionLabel && (
              <Button onClick={onAction} variant="secondary" size="sm" className="mt-3">
                {actionLabel}
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Fechar alerta"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
