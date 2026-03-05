"use client";

import React from "react";
import Link from "next/link";
import { Brain } from "lucide-react";

import { cn } from "@/presentation/lib/utils";
import { useNavigation } from "@/presentation/hooks/useNavigation";

export function Sidebar() {
  const { items } = useNavigation();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar md:block">
      <div className="flex h-full flex-col px-4 py-6">
        <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <Brain className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-sidebar-foreground">
            MindEase
          </span>
        </Link>

        <nav className="flex-1 space-y-1">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground transition-all",
                  item.isActive
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

        <div className="border-t border-sidebar-border pt-4">
          <p className="text-center text-xs text-muted-foreground">
            FIAP Inclusive © 2025
          </p>
        </div>
      </div>
    </aside>
  );
}
