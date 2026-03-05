"use client";

import React from "react";
import { motion } from "framer-motion";

import type { Task } from "@/domain/entities/task";
import { useQuickStatsViewModel } from "@/presentation/hooks/useQuickStatsViewModel";
import { cn } from "@/presentation/lib/utils";
import { quickStatsClasses as styles } from "@/presentation/components/dashboard/QuickStats.styles";

interface QuickStatsProps {
  readonly tasks: Task[];
}

export function QuickStats({ tasks }: Readonly<QuickStatsProps>) {
  const stats = useQuickStatsViewModel({ tasks });

  return (
    <div className={styles.grid}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={styles.card}
          >
            <div className={styles.content}>
              <div className={cn(styles.iconWrapperBase, stat.bgColor)}>
                <Icon className={cn(styles.iconBase, stat.color)} />
              </div>

              <div>
                <p className={styles.value}>
                  {stat.value}
                </p>
                <p className={styles.label}>{stat.label}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
