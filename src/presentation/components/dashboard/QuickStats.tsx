"use client";

import React from "react";
import { motion } from "framer-motion";

import type { Task } from "@/domain/entities/task";
import { useQuickStatsViewModel } from "@/presentation/hooks/useQuickStatsViewModel";

interface QuickStatsProps {
  readonly tasks: Task[];
}

export function QuickStats({ tasks }: Readonly<QuickStatsProps>) {
  const stats = useQuickStatsViewModel({ tasks });

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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
