"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/presentation/hooks/useAuth";
import { MobileNav } from "@/presentation/layouts/MobileNav";
import { Sidebar } from "@/presentation/layouts/Sidebar";
import { mainLayoutClientClasses as styles } from "@/presentation/layouts/MainLayoutClient.styles";

export default function MainLayoutClient({ children }: { readonly children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.root}>
      <MobileNav />
      <div className={styles.desktopSidebarWrapper}>
        <Sidebar />
      </div>
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
