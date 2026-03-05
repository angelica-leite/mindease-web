"use client";

import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";

const fontSizes = [
  { value: "small" as const, label: "P", title: "Pequeno" },
  { value: "medium" as const, label: "M", title: "Medio" },
  { value: "large" as const, label: "G", title: "Grande" },
  { value: "xlarge" as const, label: "XG", title: "Extra Grande" },
];

const spacings = [
  { value: "compact" as const, label: "Compacto" },
  { value: "comfortable" as const, label: "Confortavel" },
  { value: "spacious" as const, label: "Espacoso" },
];

const contrastLevels = [
  { value: "normal" as const, label: "Normal" },
  { value: "high" as const, label: "Alto" },
];

export function useAccessibilityPanelViewModel() {
  const { settings, updateSettings } = useAccessibility();

  return {
    settings,
    fontSizes,
    spacings,
    contrastLevels,
    setFontSize: (fontSize: (typeof fontSizes)[number]["value"]) =>
      updateSettings({ fontSize }),
    setSpacing: (spacing: (typeof spacings)[number]["value"]) =>
      updateSettings({ spacing }),
    setContrast: (contrast: (typeof contrastLevels)[number]["value"]) =>
      updateSettings({ contrast }),
    setReducedMotion: (reducedMotion: boolean) =>
      updateSettings({ reducedMotion }),
    setSimplifiedView: (simplifiedView: boolean) =>
      updateSettings({ simplifiedView }),
  };
}
