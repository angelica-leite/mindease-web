"use client";

import React from "react";
import { Type, Contrast, Maximize2, Sparkles, Eye } from "lucide-react";

import { Switch } from "@/presentation/components/ui/switch";
import { Label } from "@/presentation/components/ui/label";
import { cn } from "@/presentation/lib/utils";
import { useAccessibilityPanelViewModel } from "@/presentation/hooks/useAccessibilityPanelViewModel";

export function AccessibilityPanel() {
  const {
    settings,
    fontSizes,
    spacings,
    contrastLevels,
    setFontSize,
    setSpacing,
    setContrast,
    setReducedMotion,
    setSimplifiedView,
  } = useAccessibilityPanelViewModel();

  return (
    <div className="space-y-8">
      <div className="mindease-card">
        <div className="mb-4 flex items-center gap-3">
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
              onClick={() => setFontSize(size.value)}
              className={cn(
                "flex-1 rounded-xl py-3 font-medium transition-all",
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

      <div className="mindease-card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-focus/10">
            <Maximize2 className="h-5 w-5 text-focus" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">
              Espacamento
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
              onClick={() => setSpacing(spacing.value)}
              className={cn(
                "flex-1 rounded-xl py-3 font-medium transition-all",
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

      <div className="mindease-card">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
            <Contrast className="h-5 w-5 text-warning" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">Contraste</h3>
            <p className="text-sm text-muted-foreground">
              Aumente a visibilidade dos elementos
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {contrastLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setContrast(level.value)}
              className={cn(
                "flex-1 rounded-xl py-3 font-medium transition-all",
                settings.contrast === level.value
                  ? "bg-warning text-warning-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

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
                Reduzir Animacoes
              </Label>
              <p className="text-sm text-muted-foreground">
                Minimiza movimentos na tela
              </p>
            </div>
          </div>

          <Switch
            id="reduced-motion"
            checked={settings.reducedMotion}
            onCheckedChange={setReducedMotion}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
              <Eye className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <Label htmlFor="simplified" className="font-medium text-foreground">
                Visualizacao Simplificada
              </Label>
              <p className="text-sm text-muted-foreground">
                Remove elementos nao essenciais
              </p>
            </div>
          </div>

          <Switch
            id="simplified"
            checked={settings.simplifiedView}
            onCheckedChange={setSimplifiedView}
          />
        </div>
      </div>
    </div>
  );
}
