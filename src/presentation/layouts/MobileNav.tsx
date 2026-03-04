"use client";

import React, { useState } from "react";
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
  Menu,
} from "lucide-react";

import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";
import { cn } from "@/presentation/lib/utils";
import { Button } from "@/presentation/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/presentation/components/ui/sheet";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Painel" },
  { path: "/tasks", icon: CheckSquare, label: "Tarefas" },
  { path: "/pomodoro", icon: Timer, label: "Foco" },
  { path: "/profile", icon: User, label: "Perfil" },
  { path: "/settings", icon: Settings, label: "Configurações" },
] as const;

export function MobileNav() {
  const pathname = usePathname();
  const { settings, toggleFocusMode } = useAccessibility();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold text-sidebar-foreground">
            MindEase
          </span>
        </Link>

        {/* Hamburger Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-sidebar-foreground"
              type="button"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-72 bg-sidebar border-sidebar-border p-0"
          >
            <SheetHeader className="p-4 border-b border-sidebar-border">
              <SheetTitle className="flex items-center gap-2 text-sidebar-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                MindEase
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col h-[calc(100%-65px)] p-4">
              {/* Focus Mode Toggle */}
              <motion.button
                type="button"
                onClick={toggleFocusMode}
                className={cn(
                  "mb-4 flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                  settings.focusMode
                    ? "bg-focus text-focus-foreground"
                    : "bg-sidebar-accent text-sidebar-accent-foreground",
                )}
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
                  const isActive =
                    pathname === item.path ||
                    (item.path !== "/dashboard" &&
                      pathname?.startsWith(item.path));

                  const Icon = item.icon;

                  return (
                    <SheetClose asChild key={item.path}>
                      <Link
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
                    </SheetClose>
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
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
