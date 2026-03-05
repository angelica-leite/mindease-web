"use client";

import React from "react";
import Link from "next/link";
import { Brain, Menu } from "lucide-react";

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
import { useNavigation } from "@/presentation/hooks/useNavigation";
import { useMobileNavigation } from "@/presentation/hooks/useMobileNavigation";

export function MobileNav() {
  const { items } = useNavigation();
  const { open, onOpenChange } = useMobileNavigation();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-sidebar-border bg-sidebar md:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Brain className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold text-sidebar-foreground">
            MindEase
          </span>
        </Link>

        <Sheet open={open} onOpenChange={onOpenChange}>
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
            className="w-72 border-sidebar-border bg-sidebar p-0"
          >
            <SheetHeader className="border-b border-sidebar-border p-4">
              <SheetTitle className="flex items-center gap-2 text-sidebar-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Brain className="h-5 w-5 text-primary-foreground" />
                </div>
                MindEase
              </SheetTitle>
            </SheetHeader>

            <div className="flex h-[calc(100%-65px)] flex-col p-4">
              <nav className="flex-1 space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SheetClose asChild key={item.path}>
                      <Link
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
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="border-t border-sidebar-border pt-4">
                <p className="text-center text-xs text-muted-foreground">
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
