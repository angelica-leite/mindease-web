"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

import { QuickStats } from "@/presentation/components/dashboard/QuickStats";
import { CognitiveAlert } from "@/presentation/components/dashboard/CognitiveAlert";
import { TaskCard } from "@/presentation/components/tasks/TaskCard";
import { Button } from "@/presentation/components/ui/button";

import { useTasks } from "@/presentation/hooks/useTasks";

export default function DashboardClient() {
  const { tasks, moveTask, toggleChecklistItem, getTasksByStatus } = useTasks();
  const [showAlert, setShowAlert] = useState(true);

  const inProgressTasks = useMemo(
    () => getTasksByStatus("in-progress"),
    [getTasksByStatus],
  );
  const todoTasks = useMemo(() => getTasksByStatus("todo"), [getTasksByStatus]);

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  }, []);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground mb-1">
            {greeting} 👋
          </h1>
          <p className="text-muted-foreground">
            Vamos organizar suas tarefas com calma
          </p>
        </div>

        <Link href="/pomodoro">
          <Button className="mindease-button-primary">
            <Sparkles className="h-4 w-4 mr-2" />
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
            message="Lembre-se: respire fundo. Você está fazendo um ótimo trabalho! 🌿"
            onDismiss={() => setShowAlert(false)}
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
        className="grid md:grid-cols-2 gap-6"
      >
        {/* Em Progresso */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">
              Em Progresso
            </h2>
            <Link
              href="/tasks"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {inProgressTasks.slice(0, 3).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(status) => moveTask(task.id, status)}
                onChecklistToggle={(itemId) =>
                  toggleChecklistItem(task.id, itemId)
                }
              />
            ))}

            {inProgressTasks.length === 0 && (
              <div className="mindease-card text-center py-8">
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

        {/* A Fazer */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-foreground">
              A Fazer
            </h2>
            <Link
              href="/tasks"
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
              Ver todas <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {todoTasks.slice(0, 3).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={(status) => moveTask(task.id, status)}
                onChecklistToggle={(itemId) =>
                  toggleChecklistItem(task.id, itemId)
                }
              />
            ))}

            {todoTasks.length === 0 && (
              <div className="mindease-card text-center py-8">
                <p className="text-muted-foreground">
                  Nenhuma tarefa pendente 🎉
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
