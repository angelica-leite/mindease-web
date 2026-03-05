"use client";

import { motion } from "framer-motion";
import { User, Mail, Calendar, Award } from "lucide-react";

import { useProfileViewModel } from "@/presentation/hooks/useProfileViewModel";

export default function ProfileClient() {
  const { completedTasks } = useProfileViewModel();

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="mb-1 text-3xl font-display font-bold text-foreground">
          Meu Perfil
        </h1>
        <p className="text-muted-foreground">Suas informacoes e progresso</p>
      </motion.div>

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
              Usuario MindEase
            </h2>

            <div className="mt-1 flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">usuario@example.com</span>
            </div>

            <div className="mt-1 flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">Membro desde Janeiro 2025</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <div className="mindease-card text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
            <Award className="h-6 w-6 text-success" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">
            {completedTasks}
          </p>
          <p className="text-sm text-muted-foreground">Tarefas Concluidas</p>
        </div>

        <div className="mindease-card text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-focus/10">
            <Award className="h-6 w-6 text-focus" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">12</p>
          <p className="text-sm text-muted-foreground">Sessoes de Foco</p>
        </div>

        <div className="mindease-card text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <p className="text-3xl font-display font-bold text-foreground">5h</p>
          <p className="text-sm text-muted-foreground">Tempo de Foco</p>
        </div>
      </motion.div>
    </div>
  );
}
