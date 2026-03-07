"use client";

import { motion } from "framer-motion";
import { Award, Calendar, Mail, User } from "lucide-react";

import { useProfileViewModel } from "@/presentation/hooks/useProfileViewModel";
import { profileClientClasses as styles } from "@/presentation/pages/profile/ProfileClient.styles";

export default function ProfileClient() {
  const { completedTasks } = useProfileViewModel();

  return (
    <div className={styles.page}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>Meu perfil</h1>
        <p className={styles.description}>Suas informações e progresso</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={styles.profileCard}
      >
        <div className={styles.profileCardContent}>
          <div className={styles.avatarWrapper}>
            <User className={styles.avatarIcon} />
          </div>

          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>Usuário MindEase</h2>

            <div className={styles.infoRow}>
              <Mail className={styles.infoIcon} />
              <span className={styles.infoText}>usuario@example.com</span>
            </div>

            <div className={styles.infoRow}>
              <Calendar className={styles.infoIcon} />
              <span className={styles.infoText}>Membro desde Janeiro 2026</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={styles.statsGrid}
      >
        <div className={styles.statCard}>
          <div className={styles.statIconSuccessWrapper}>
            <Award className={styles.statIconSuccess} />
          </div>
          <p className={styles.statValue}>{completedTasks}</p>
          <p className={styles.statLabel}>Tarefas concluídas</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconFocusWrapper}>
            <Award className={styles.statIconFocus} />
          </div>
          <p className={styles.statValue}>12</p>
          <p className={styles.statLabel}>Sessões de foco</p>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIconPrimaryWrapper}>
            <Award className={styles.statIconPrimary} />
          </div>
          <p className={styles.statValue}>5h</p>
          <p className={styles.statLabel}>Tempo de foco</p>
        </div>
      </motion.div>
    </div>
  );
}
