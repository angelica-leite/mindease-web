"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  Settings,
  User,
  Brain,
  Focus,
} from "lucide-react";

import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";
import { cn } from "@/presentation/lib/utils";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Painel" },
  { path: "/tasks", icon: CheckSquare, label: "Tarefas" },
  { path: "/pomodoro", icon: Timer, label: "Foco" },
  { path: "/profile", icon: User, label: "Perfil" },
  { path: "/settings", icon: Settings, label: "Configurações" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const { settings, toggleFocusMode } = useAccessibility();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border hidden md:block">
      <div className="flex h-full flex-col px-4 py-6">
        {/* Logo */}
        <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-sidebar-foreground">
            MindEase
          </span>
        </Link>

        {/* Focus Mode Toggle */}
        <motion.button
          type="button"
          onClick={toggleFocusMode}
          className={cn(
            "mb-6 flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
            settings.focusMode
              ? "bg-focus text-focus-foreground"
              : "bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80",
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Focus className="h-5 w-5" />
          <span className="font-medium">
            {settings.focusMode ? "Modo Foco Ativo" : "Ativar Modo Foco"}
          </span>
        </motion.button>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              pathname === item.path ||
              (item.path !== "/dashboard" && pathname?.startsWith(item.path));

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground transition-all",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="pt-4 border-t border-sidebar-border">
          <p className="text-xs text-muted-foreground text-center">
            FIAP Inclusive © 2025
          </p>
        </div>
      </div>
    </aside>
  );
}
