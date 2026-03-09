"use client";

import { motion } from "framer-motion";

import { AccessibilityPanel } from "@/presentation/components/accessibility/AccessibilityPanel";
import { settingsClientClasses as styles } from "@/presentation/pages/settings/SettingsClient.styles";

export default function SettingsClient() {
  return (
    <div className={styles.page}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className={styles.title}>Configurações</h1>
        <p className={styles.description}>
          Personalize sua experiência de acordo com suas necessidades
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AccessibilityPanel />
      </motion.div>
    </div>
  );
}
