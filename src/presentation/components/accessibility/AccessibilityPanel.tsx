"use client";

import { Type, Contrast, Maximize2, Sparkles, Eye } from "lucide-react";

import { Label } from "@/presentation/components/ui/label";
import { Switch } from "@/presentation/components/ui/switch";
import { cn } from "@/presentation/lib/utils";
import { useAccessibilityPanelViewModel } from "@/presentation/hooks/useAccessibilityPanelViewModel";
import { accessibilityPanelClasses as styles } from "@/presentation/components/accessibility/AccessibilityPanel.styles";

export function AccessibilityPanel() {
  const {
    settings,
    fontSizes,
    spacings,
    contrastLevels,
    complexityLevels,
    detailLevels,
    setFontSize,
    setSpacing,
    setContrast,
    setComplexityLevel,
    setDetailLevel,
    setReducedMotion,
    setSimplifiedView,
  } = useAccessibilityPanelViewModel();

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.iconBoxPrimary}>
            <Type className={styles.iconPrimary} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Tamanho da Fonte</h3>
            <p className={styles.sectionDescription}>Ajuste o tamanho do texto</p>
          </div>
        </div>

        <div className={styles.optionGroup}>
          {fontSizes.map((size) => (
            <button
              key={size.value}
              type="button"
              onClick={() => setFontSize(size.value)}
              className={cn(
                styles.optionButtonBase,
                settings.fontSize === size.value
                  ? styles.optionButtonPrimarySelected
                  : styles.optionButtonDefault,
              )}
              title={size.title}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.iconBoxFocus}>
            <Maximize2 className={styles.iconFocus} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Espaçamento</h3>
            <p className={styles.sectionDescription}>Controle o respiro visual entre elementos</p>
          </div>
        </div>

        <div className={styles.optionGroup}>
          {spacings.map((spacing) => (
            <button
              key={spacing.value}
              type="button"
              onClick={() => setSpacing(spacing.value)}
              className={cn(
                styles.optionButtonBase,
                settings.spacing === spacing.value
                  ? styles.optionButtonFocusSelected
                  : styles.optionButtonDefault,
              )}
            >
              {spacing.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.iconBoxWarning}>
            <Contrast className={styles.iconWarning} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Contraste</h3>
            <p className={styles.sectionDescription}>Aumente a visibilidade dos elementos</p>
          </div>
        </div>

        <div className={styles.optionGroup}>
          {contrastLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setContrast(level.value)}
              className={cn(
                styles.optionButtonBase,
                settings.contrast === level.value
                  ? styles.optionButtonWarningSelected
                  : styles.optionButtonDefault,
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.iconBoxFocus}>
            <Sparkles className={styles.iconFocus} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Complexidade</h3>
            <p className={styles.sectionDescription}>Ajuste densidade de informação e fluxo</p>
          </div>
        </div>

        <div className={styles.optionGroup}>
          {complexityLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setComplexityLevel(level.value)}
              className={cn(
                styles.optionButtonBase,
                settings.complexityLevel === level.value
                  ? styles.optionButtonFocusSelected
                  : styles.optionButtonDefault,
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.sectionHeader}>
          <div className={styles.iconBoxPrimary}>
            <Eye className={styles.iconPrimary} />
          </div>
          <div>
            <h3 className={styles.sectionTitle}>Nível de detalhe</h3>
            <p className={styles.sectionDescription}>
              Muda estrutura visual entre resumo e detalhado
            </p>
          </div>
        </div>

        <div className={styles.optionGroup}>
          {detailLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setDetailLevel(level.value)}
              className={cn(
                styles.optionButtonBase,
                settings.detailLevel === level.value
                  ? styles.optionButtonPrimarySelected
                  : styles.optionButtonDefault,
              )}
            >
              {level.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.cardWithSpacing}>
        <div className={styles.controlRow}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconBoxSuccess}>
              <Sparkles className={styles.iconSuccess} />
            </div>
            <div>
              <Label htmlFor="reduced-motion" className={styles.label}>
                Reduzir animações
              </Label>
              <p className={styles.sectionDescription}>Minimiza movimentos na tela</p>
            </div>
          </div>

          <Switch
            id="reduced-motion"
            checked={settings.reducedMotion}
            onCheckedChange={setReducedMotion}
          />
        </div>

        <div className={styles.controlRow}>
          <div className={styles.sectionHeader}>
            <div className={styles.iconBoxSecondary}>
              <Eye className={styles.iconSecondary} />
            </div>
            <div>
              <Label htmlFor="simplified" className={styles.label}>
                Visualização simplificada
              </Label>
              <p className={styles.sectionDescription}>Remove elementos não essenciais</p>
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
