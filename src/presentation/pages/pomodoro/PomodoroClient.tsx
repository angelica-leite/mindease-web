"use client";

import React from "react";
import { motion } from "framer-motion";
import { Brain, Heart, Leaf } from "lucide-react";

import { usePomodoro } from "@/presentation/hooks/usePomodoro";
import { PomodoroTimer } from "@/presentation/components/pomodoro/PomodoroTimer";

const tips = [
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

export default function PomodoroClient() {
  const pomodoro = usePomodoro();

  if (pomodoro.phase === "work" && pomodoro.isRunning) {
    return (
      <div className="fixed inset-0 z-[60] bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-3xl mindease-card py-12 flex justify-center">
          <PomodoroTimer controller={pomodoro} />
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
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
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
        className="mindease-card py-12 flex justify-center"
      >
        <PomodoroTimer controller={pomodoro} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
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
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-3">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="font-display font-semibold text-foreground mb-1">
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
