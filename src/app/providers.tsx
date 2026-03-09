"use client";

import { AccessibilityProvider } from "@/presentation/contexts/AccessibilityContext";
import { AuthProvider } from "@/presentation/contexts/AuthContext";

export default function Providers({ children }: { readonly children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AccessibilityProvider>{children}</AccessibilityProvider>
    </AuthProvider>
  );
}
