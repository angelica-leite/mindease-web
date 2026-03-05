"use client";

import React from "react";
import { motion } from "framer-motion";

import { PomodoroTimer } from "@/presentation/components/pomodoro/PomodoroTimer";
import { usePomodoroPageViewModel } from "@/presentation/hooks/usePomodoroPageViewModel";
import { pomodoroClientClasses as styles } from "@/presentation/pages/pomodoro/PomodoroClient.styles";

export default function PomodoroClient() {
  const { controller, showFocusedMode, tips } = usePomodoroPageViewModel();

  if (showFocusedMode) {
    return (
      <div className={styles.focusedWrapper}>
        <div className={styles.focusedCard}>
          <PomodoroTimer controller={controller} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        <h1 className={styles.title}>Timer de Foco</h1>
        <p className={styles.description}>
          Use a técnica Pomodoro para manter o foco
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className={styles.timerCard}
      >
        <PomodoroTimer controller={controller} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={styles.tipsGrid}
      >
        {tips.map((tip, index) => {
          const Icon = tip.icon;

          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={styles.tipCard}
            >
              <div className={styles.tipIconWrapper}>
                <Icon className={styles.tipIcon} />
              </div>

              <h3 className={styles.tipTitle}>{tip.title}</h3>
              <p className={styles.tipDescription}>{tip.description}</p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
