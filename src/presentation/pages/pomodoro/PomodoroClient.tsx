"use client";

import React from "react";
import { motion } from "framer-motion";

import { usePomodoroPageViewModel } from "@/presentation/hooks/usePomodoroPageViewModel";
import { PomodoroTimer } from "@/presentation/components/pomodoro/PomodoroTimer";

export default function PomodoroClient() {
  const { controller, showFocusedMode, tips } = usePomodoroPageViewModel();

  if (showFocusedMode) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background p-4">
        <div className="mindease-card flex w-full max-w-3xl justify-center py-12">
          <PomodoroTimer controller={controller} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="mb-1 text-3xl font-display font-bold text-foreground">
          Timer de Foco
        </h1>
        <p className="text-muted-foreground">
          Use a técnica Pomodoro para manter o foco
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mindease-card flex justify-center py-12"
      >
        <PomodoroTimer controller={controller} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {tips.map((tip, index) => {
          const Icon = tip.icon;

          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="mindease-card text-center"
            >
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mb-1 font-display font-semibold text-foreground">
                {tip.title}
              </h3>

              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
