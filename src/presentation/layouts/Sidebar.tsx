"use client";

import Link from "next/link";
import { Brain } from "lucide-react";

import { useNavigation } from "@/presentation/hooks/useNavigation";
import { cn } from "@/presentation/lib/utils";
import { sidebarClasses as styles } from "@/presentation/layouts/Sidebar.styles";

export function Sidebar() {
  const { items } = useNavigation();

  return (
    <aside className={styles.root}>
      <div className={styles.content}>
        <Link href="/dashboard" className={styles.brandLink}>
          <div className={styles.brandIconWrapper}>
            <Brain className={styles.brandIcon} />
          </div>
          <span className={styles.brandText}>MindEase</span>
        </Link>

        <nav className={styles.nav}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  styles.navItemBase,
                  item.isActive ? styles.navItemActive : styles.navItemDefault,
                )}
              >
                <Icon className={styles.navItemIcon} />
                <span className={styles.navItemLabel}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <p className={styles.footerText}>FIAP Inclusive (c) 2025</p>
        </div>
      </div>
    </aside>
  );
}
