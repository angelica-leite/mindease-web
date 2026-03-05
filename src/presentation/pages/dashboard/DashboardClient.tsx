"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

import { QuickStats } from "@/presentation/components/dashboard/QuickStats";
import { CognitiveAlert } from "@/presentation/components/dashboard/CognitiveAlert";
import { TaskCard } from "@/presentation/components/tasks/TaskCard";
import { Button } from "@/presentation/components/ui/button";
import { useDashboardViewModel } from "@/presentation/hooks/useDashboardViewModel";

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
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="mb-1 text-3xl font-display font-bold text-foreground">
            {greeting}
          </h1>
          <p className="text-muted-foreground">
            Vamos organizar suas tarefas com calma
          </p>
        </div>

        <Link href="/pomodoro">
          <Button className="mindease-button-primary">
            <Sparkles className="mr-2 h-4 w-4" />
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
            message="Lembre-se: respire fundo. Voce esta fazendo um otimo trabalho."
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
        className="grid gap-6 md:grid-cols-2"
      >
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">
              Em Progresso
            </h2>
            <Link
              href="/tasks"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {topInProgressTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(status) => moveTask(task.id, status)}
                onChecklistToggle={(itemId) =>
                  toggleChecklistItem(task.id, itemId)
                }
              />
            ))}

            {inProgressCount === 0 && (
              <div className="mindease-card py-8 text-center">
                <p className="text-muted-foreground">
                  Nenhuma tarefa em progresso
                </p>
                <Link href="/tasks">
                  <Button variant="link" className="mt-2">
                    Iniciar uma tarefa
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display font-semibold text-foreground">
              A Fazer
            </h2>
            <Link
              href="/tasks"
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {topTodoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(status) => moveTask(task.id, status)}
                onChecklistToggle={(itemId) =>
                  toggleChecklistItem(task.id, itemId)
                }
              />
            ))}

            {todoCount === 0 && (
              <div className="mindease-card py-8 text-center">
                <p className="text-muted-foreground">Nenhuma tarefa pendente</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
