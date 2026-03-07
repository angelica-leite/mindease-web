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
  { value: "comfortable" as const, label: "Confortável" },
  { value: "spacious" as const, label: "Espaçoso" },
];

const contrastLevels = [
  { value: "normal" as const, label: "Normal" },
  { value: "high" as const, label: "Alto" },
];

const complexityLevels = [
  { value: "low" as const, label: "Baixa" },
  { value: "medium" as const, label: "Média" },
  { value: "high" as const, label: "Alta" },
];

const detailLevels = [
  { value: "summary" as const, label: "Resumo" },
  { value: "detailed" as const, label: "Detalhado" },
];

export function useAccessibilityPanelViewModel() {
  const { settings, updateSettings } = useAccessibility();

  return {
    settings,
    fontSizes,
    spacings,
    contrastLevels,
    complexityLevels,
    detailLevels,
    setFontSize: (fontSize: (typeof fontSizes)[number]["value"]) => updateSettings({ fontSize }),
    setSpacing: (spacing: (typeof spacings)[number]["value"]) => updateSettings({ spacing }),
    setContrast: (contrast: (typeof contrastLevels)[number]["value"]) =>
      updateSettings({ contrast }),
    setComplexityLevel: (complexityLevel: (typeof complexityLevels)[number]["value"]) =>
      updateSettings({ complexityLevel }),
    setDetailLevel: (detailLevel: (typeof detailLevels)[number]["value"]) =>
      updateSettings({ detailLevel }),
    setReducedMotion: (reducedMotion: boolean) => updateSettings({ reducedMotion }),
    setSimplifiedView: (simplifiedView: boolean) => updateSettings({ simplifiedView }),
  };
}
