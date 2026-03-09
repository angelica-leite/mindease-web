export const accessibilityPanelClasses = {
  page: "space-y-8",
  card: "mindease-card",
  cardWithSpacing: "mindease-card space-y-5",
  sectionHeader: "mb-4 flex items-center gap-3",
  controlRow: "flex items-center justify-between",
  optionGroup: "flex gap-2",
  iconBoxPrimary: "icon-parent flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10",
  iconBoxFocus: "icon-parent flex h-10 w-10 items-center justify-center rounded-xl bg-focus/10",
  iconBoxWarning:
    "icon-parent flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10",
  iconBoxSuccess:
    "icon-parent flex h-10 w-10 items-center justify-center rounded-xl bg-success/10",
  iconBoxSecondary:
    "icon-parent flex h-10 w-10 items-center justify-center rounded-xl bg-secondary",
  iconPrimary: "icon-nonessential h-5 w-5 text-primary",
  iconFocus: "icon-nonessential h-5 w-5 text-focus",
  iconWarning: "icon-nonessential h-5 w-5 text-warning",
  iconSuccess: "icon-nonessential h-5 w-5 text-success",
  iconSecondary: "icon-nonessential h-5 w-5 text-secondary-foreground",
  sectionTitle: "font-display font-semibold text-foreground",
  sectionDescription: "detail-explanatory text-sm text-muted-foreground",
  optionButtonBase: "flex-1 rounded-xl py-3 font-medium transition-all",
  optionButtonDefault: "bg-muted text-muted-foreground hover:bg-muted/80",
  optionButtonPrimarySelected: "bg-sidebar-primary text-primary-foreground",
  optionButtonFocusSelected: "bg-focus text-focus-foreground",
  optionButtonWarningSelected: "bg-warning text-warning-foreground",
  label: "font-medium text-foreground",
} as const;
