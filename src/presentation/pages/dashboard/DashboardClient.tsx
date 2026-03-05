"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { CognitiveAlert } from "@/presentation/components/dashboard/CognitiveAlert";
import { QuickStats } from "@/presentation/components/dashboard/QuickStats";
import { Button } from "@/presentation/components/ui/button";
import { TaskCard } from "@/presentation/components/tasks/TaskCard";
import { useDashboardViewModel } from "@/presentation/hooks/useDashboardViewModel";
import { dashboardClientClasses as styles } from "@/presentation/pages/dashboard/DashboardClient.styles";

export default function DashboardClient() {
  const {
    tasks,
    greeting,
    showAlert,
    topInProgressTasks,
    topTodoTasks,
    inProgressCount,
    todoCount,
    dismissAlert,
    moveTask,
    toggleChecklistItem,
  } = useDashboardViewModel();

  return (
    <div className={styles.page}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.hero}
      >
        <div>
          <h1 className={styles.title}>{greeting}</h1>
          <p className={styles.subtitle}>Vamos organizar suas tarefas com calma</p>
        </div>

        <Link href="/pomodoro">
          <Button className={styles.focusButton}>
            <Sparkles className={styles.focusButtonIcon} />
            Iniciar Foco
          </Button>
        </Link>
      </motion.div>

      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CognitiveAlert
            type="breathe"
            message="Lembre-se: respire fundo. Você está fazendo um ótimo trabalho."
            onDismiss={dismissAlert}
          />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <QuickStats tasks={tasks} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={styles.columnsGrid}
      >
        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Em Progresso</h2>
            <Link href="/tasks" className={styles.sectionLink}>
              Ver todas <ArrowRight className={styles.sectionLinkIcon} />
            </Link>
          </div>

          <div className={styles.cardsStack}>
            {topInProgressTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(status) => moveTask(task.id, status)}
                onChecklistToggle={(itemId) => toggleChecklistItem(task.id, itemId)}
              />
            ))}

            {inProgressCount === 0 && (
              <div className={styles.emptyStateCard}>
                <p className={styles.emptyStateText}>Nenhuma tarefa em progresso</p>
                <Link href="/tasks">
                  <Button variant="link" className={styles.emptyStateButton}>
                    Iniciar uma tarefa
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>A Fazer</h2>
            <Link href="/tasks" className={styles.sectionLink}>
              Ver todas <ArrowRight className={styles.sectionLinkIcon} />
            </Link>
          </div>

          <div className={styles.cardsStack}>
            {topTodoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(status) => moveTask(task.id, status)}
                onChecklistToggle={(itemId) => toggleChecklistItem(task.id, itemId)}
              />
            ))}

            {todoCount === 0 && (
              <div className={styles.emptyStateCard}>
                <p className={styles.emptyStateText}>Nenhuma tarefa pendente</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
