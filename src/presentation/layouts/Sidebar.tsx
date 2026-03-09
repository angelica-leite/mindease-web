"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, LogOut } from "lucide-react";

import { useAuth } from "@/presentation/hooks/useAuth";
import { useNavigation } from "@/presentation/hooks/useNavigation";
import { cn } from "@/presentation/lib/utils";
import { sidebarClasses as styles } from "@/presentation/layouts/Sidebar.styles";

export function Sidebar() {
  const router = useRouter();
  const { items } = useNavigation();
  const { profile, logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/login");
  }

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
          <div className={styles.userInfo}>
            <p className={styles.userName}>{profile?.name ?? "Usuario"}</p>
            <p className={styles.userEmail}>{profile?.email ?? "sem-email@example.com"}</p>
          </div>
          <button type="button" className={styles.logoutButton} onClick={handleLogout}>
            <LogOut />
            Sair da conta
          </button>
          <p className={styles.footerText}>FIAP Inclusive (c) 2025</p>
        </div>
      </div>
    </aside>
  );
}
