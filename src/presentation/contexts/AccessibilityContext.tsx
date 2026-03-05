"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large" | "xlarge";
  contrast: "normal" | "high";
  spacing: "compact" | "comfortable" | "spacious";
  reducedMotion: boolean;
  simplifiedView: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

const STORAGE_KEY = "mindease-accessibility";

const defaultSettings: AccessibilitySettings = {
  fontSize: "medium",
  contrast: "normal",
  spacing: "comfortable",
  reducedMotion: false,
  simplifiedView: false,
};

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider",
    );
  }
  return context;
}

function readStoredSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultSettings;

    const parsed = JSON.parse(saved) as Partial<AccessibilitySettings>;

    // merge + garante fallback caso falte algo
    return { ...defaultSettings, ...parsed };
  } catch {
    return defaultSettings;
  }
}

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() =>
    readStoredSettings(),
  );

  // Persist + aplica no DOM
  useEffect(() => {
    // Persist
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }

    const root = document.documentElement;

    // CSS vars
    const fontSizes: Record<AccessibilitySettings["fontSize"], string> = {
      small: "14px",
      medium: "16px",
      large: "18px",
      xlarge: "20px",
    };
    root.style.setProperty("--base-font-size", fontSizes[settings.fontSize]);

    const spacingValues: Record<AccessibilitySettings["spacing"], string> = {
      compact: "1.25",
      comfortable: "1.5",
      spacious: "1.75",
    };
    root.style.setProperty(
      "--spacing-relaxed",
      spacingValues[settings.spacing],
    );

    // Classes
    root.classList.toggle("reduce-motion", settings.reducedMotion);
    root.classList.toggle("high-contrast", settings.contrast === "high");
    root.classList.toggle("simplified-view", settings.simplifiedView);
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const value = useMemo(
    () => ({ settings, updateSettings }),
    [settings],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}
