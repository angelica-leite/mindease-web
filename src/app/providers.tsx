"use client";

import { AccessibilityProvider } from "@/presentation/contexts/AccessibilityContext";

export default function Providers({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return <AccessibilityProvider>{children}</AccessibilityProvider>;
}
