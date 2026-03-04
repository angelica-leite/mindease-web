"use client";

import React from "react";
import { Sidebar } from "@/presentation/layouts/Sidebar";
import { MobileNav } from "@/presentation/layouts/MobileNav";
import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";
import { cn } from "@/presentation/lib/utils";

export default function MainLayoutClient({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const { settings } = useAccessibility();

  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        settings.focusMode && "focus-mode",
      )}
    >
      {/* Mobile Navigation */}
      <MobileNav />

      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main
        className={cn(
          "min-h-screen",
          "pt-16 px-4 pb-6",
          "md:pt-0 md:ml-64 md:p-8",
        )}
      >
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
