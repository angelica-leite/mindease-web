"use client";

import { motion } from "framer-motion";
import { User, Mail, Calendar, Award } from "lucide-react";

import { useTasks } from "@/presentation/hooks/useTasks";

export default function ProfileClient() {
  const { tasks } = useTasks();

  const completedTasks = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          Meu Perfil
        </h1>
        <p className="text-muted-foreground">Suas informações e progresso</p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mindease-card"
      >
        <div className="flex items-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <User className="h-10 w-10 text-primary" />
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-display font-semibold text-foreground">
              Usuário MindEase
            </h2>

            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Mail className="h-4 w-4" />
              <span className="text-sm">usuario@example.com</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Membro desde Janeiro 2025</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <div className="mindease-card text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 mx-auto mb-3">
            <Award className="h-6 w-6 text-success" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">
            {completedTasks}
          </p>
          <p className="text-sm text-muted-foreground">Tarefas Concluídas</p>
        </div>

        <div className="mindease-card text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-focus/10 mx-auto mb-3">
            <Award className="h-6 w-6 text-focus" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">12</p>
          <p className="text-sm text-muted-foreground">Sessões de Foco</p>
        </div>

        <div className="mindease-card text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mx-auto mb-3">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">5h</p>
          <p className="text-sm text-muted-foreground">Tempo de Foco</p>
        </div>
      </motion.div>
    </div>
  );
}
