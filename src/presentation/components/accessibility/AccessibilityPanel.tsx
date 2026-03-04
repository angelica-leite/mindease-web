"use client";

import React from "react";
import { Type, Contrast, Maximize2, Sparkles, Eye } from "lucide-react";

import { useAccessibility } from "@/presentation/contexts/AccessibilityContext";
import { Switch } from "@/presentation/components/ui/switch";
import { Label } from "@/presentation/components/ui/label";
import { cn } from "@/presentation/lib/utils";

const fontSizes = [
  { value: "small" as const, label: "P", title: "Pequeno" },
  { value: "medium" as const, label: "M", title: "Médio" },
  { value: "large" as const, label: "G", title: "Grande" },
  { value: "xlarge" as const, label: "XG", title: "Extra Grande" },
];

const spacings = [
  { value: "compact" as const, label: "Compacto" },
  { value: "comfortable" as const, label: "Confortável" },
  { value: "spacious" as const, label: "Espaçoso" },
];

export function AccessibilityPanel() {
  const { settings, updateSettings } = useAccessibility();

  return (
    <div className="space-y-8">
      {/* Font Size */}
      <div className="mindease-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Type className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Tamanho da Fonte
            </h3>
            <p className="text-sm text-muted-foreground">
              Ajuste o tamanho do texto
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {fontSizes.map((size) => (
            <button
              key={size.value}
              type="button"
              onClick={() => updateSettings({ fontSize: size.value })}
              className={cn(
                "flex-1 py-3 rounded-xl font-medium transition-all",
                settings.fontSize === size.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
              title={size.title}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Spacing */}
      <div className="mindease-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-focus/10">
            <Maximize2 className="h-5 w-5 text-focus" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Espaçamento
            </h3>
            <p className="text-sm text-muted-foreground">
              Controle o respiro visual entre elementos
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {spacings.map((spacing) => (
            <button
              key={spacing.value}
              type="button"
              onClick={() => updateSettings({ spacing: spacing.value })}
              className={cn(
                "flex-1 py-3 rounded-xl font-medium transition-all",
                settings.spacing === spacing.value
                  ? "bg-focus text-focus-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {spacing.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contrast */}
      <div className="mindease-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
            <Contrast className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Contraste
            </h3>
            <p className="text-sm text-muted-foreground">
              Aumente a visibilidade dos elementos
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateSettings({ contrast: "normal" })}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium transition-all",
              settings.contrast === "normal"
                ? "bg-warning text-warning-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            Normal
          </button>

          <button
            type="button"
            onClick={() => updateSettings({ contrast: "high" })}
            className={cn(
              "flex-1 py-3 rounded-xl font-medium transition-all",
              settings.contrast === "high"
                ? "bg-warning text-warning-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            Alto
          </button>
        </div>
      </div>

      {/* Toggles */}
      <div className="mindease-card space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
              <Sparkles className="h-5 w-5 text-success" />
            </div>
            <div>
              <Label
                htmlFor="reduced-motion"
                className="font-medium text-foreground"
              >
                Reduzir Animações
              </Label>
              <p className="text-sm text-muted-foreground">
                Minimiza movimentos na tela
              </p>
            </div>
          </div>

          <Switch
            id="reduced-motion"
            checked={settings.reducedMotion}
            onCheckedChange={(checked) =>
              updateSettings({ reducedMotion: checked })
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <Eye className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <Label
                htmlFor="simplified"
                className="font-medium text-foreground"
              >
                Visualização Simplificada
              </Label>
              <p className="text-sm text-muted-foreground">
                Remove elementos não essenciais
              </p>
            </div>
          </div>

          <Switch
            id="simplified"
            checked={settings.simplifiedView}
            onCheckedChange={(checked) =>
              updateSettings({ simplifiedView: checked })
            }
          />
        </div>
      </div>
    </div>
  );
}
