"use client";

import React from "react";
import { motion } from "framer-motion";
import { AccessibilityPanel } from "@/presentation/components/accessibility/AccessibilityPanel";

export default function SettingsClient() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          Configurações
        </h1>
        <p className="text-muted-foreground">
          Personalize sua experiência de acordo com suas necessidades
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="font-display font-semibold text-foreground mb-4">
          Acessibilidade Cognitiva
        </h2>
        <AccessibilityPanel />
      </motion.div>
    </div>
  );
}
