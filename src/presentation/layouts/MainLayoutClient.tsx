"use client";

import React from "react";
import { MobileNav } from "@/presentation/layouts/MobileNav";
import { Sidebar } from "@/presentation/layouts/Sidebar";
import { mainLayoutClientClasses as styles } from "@/presentation/layouts/MainLayoutClient.styles";

export default function MainLayoutClient({ children }: { readonly children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Sidebar - hidden on mobile */}
      <div className={styles.desktopSidebarWrapper}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
