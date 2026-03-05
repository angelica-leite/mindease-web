"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { Button } from "@/presentation/components/ui/button";
import { useCognitiveAlertViewModel } from "@/presentation/hooks/useCognitiveAlertViewModel";
import { cognitiveAlertClasses as styles } from "@/presentation/components/dashboard/CognitiveAlert.styles";

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
        <div className={styles.content}>
          <div className={iconContainerClassName}>
            <Icon className={styles.icon} />
          </div>

          <div className={styles.body}>
            <p className={styles.message}>{message}</p>

            {showAction && onAction && actionLabel && (
              <Button
                onClick={onAction}
                variant="secondary"
                size="sm"
                className={styles.actionButton}
              >
                {actionLabel}
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={onDismiss}
            className={styles.closeButton}
            aria-label="Fechar alerta"
          >
            <X className={styles.icon} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
