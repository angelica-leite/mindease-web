"use client";

import React from "react";
import Link from "next/link";
import { Brain, Menu } from "lucide-react";

import { Button } from "@/presentation/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/presentation/components/ui/sheet";
import { useMobileNavigation } from "@/presentation/hooks/useMobileNavigation";
import { useNavigation } from "@/presentation/hooks/useNavigation";
import { cn } from "@/presentation/lib/utils";
import { mobileNavClasses as styles } from "@/presentation/layouts/MobileNav.styles";

export function MobileNav() {
  const { items } = useNavigation();
  const { open, onOpenChange } = useMobileNavigation();

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link href="/dashboard" className={styles.brandLink}>
          <div className={styles.brandIconWrapper}>
            <Brain className={styles.brandIcon} />
          </div>
          <span className={styles.brandText}>MindEase</span>
        </Link>

        <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={styles.menuButton} type="button">
              <Menu className={styles.menuIcon} />
              <span className={styles.srOnly}>Abrir menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className={styles.sheetContent}>
            <SheetHeader className={styles.sheetHeader}>
              <SheetTitle className={styles.sheetTitle}>
                <div className={styles.brandIconWrapper}>
                  <Brain className={styles.brandIcon} />
                </div>
                MindEase
              </SheetTitle>
            </SheetHeader>

            <div className={styles.navContainer}>
              <nav className={styles.nav}>
                {items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={cn(
                          styles.navItemBase,
                          item.isActive ? styles.navItemActive : styles.navItemDefault,
                        )}
                      >
                        <Icon className={styles.navItemIcon} />
                        <span className={styles.navItemLabel}>{item.label}</span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              <div className={styles.footer}>
                <p className={styles.footerText}>FIAP Inclusive (c) 2025</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
