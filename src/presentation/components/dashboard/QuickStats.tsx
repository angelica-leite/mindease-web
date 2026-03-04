"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Target, Zap } from "lucide-react";
import { Task } from "@/domain/entities/task";

interface QuickStatsProps {
  tasks: Task[];
}

export function QuickStats({ tasks }: Readonly<QuickStatsProps>) {
  const { completed, inProgress, total, completionRate } = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "done").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const total = tasks.length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return { completed, inProgress, total, completionRate };
  }, [tasks]);

  const stats = useMemo(
    () => [
      {
        label: "Concluídas",
        value: completed,
        icon: CheckCircle2,
        color: "text-success",
        bgColor: "bg-success/10",
      },
      {
        label: "Em Progresso",
        value: inProgress,
        icon: Clock,
        color: "text-focus",
        bgColor: "bg-focus/10",
      },
      {
        label: "Total",
        value: total,
        icon: Target,
        color: "text-primary",
        bgColor: "bg-primary/10",
      },
      {
        label: "Progresso",
        value: `${completionRate}%`,
        icon: Zap,
        color: "text-warning",
        bgColor: "bg-warning/10",
      },
    ],
    [completed, inProgress, total, completionRate],
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mindease-card"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bgColor}`}
              >
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>

              <div>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
