export const profileClientClasses = {
  page: "space-y-8",
  title: "mb-1 text-3xl font-display font-bold text-foreground",
  description: "detail-explanatory text-muted-foreground",
  profileCard: "mindease-card",
  profileCardContent: "flex items-center gap-6",
  avatarWrapper: "icon-parent flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10",
  avatarIcon: "icon-nonessential h-10 w-10 text-primary",
  profileInfo: "flex-1",
  profileName: "text-xl font-display font-semibold text-foreground",
  infoRow: "mt-1 flex items-center gap-2 text-muted-foreground",
  infoIcon: "icon-nonessential h-4 w-4",
  infoText: "text-sm",
  statsGrid: "grid gap-4 md:grid-cols-3",
  statCard: "mindease-card text-center",
  statIconSuccessWrapper:
    "icon-parent mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10",
  statIconFocusWrapper:
    "icon-parent mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-focus/10",
  statIconPrimaryWrapper:
    "icon-parent mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10",
  statIconSuccess: "icon-nonessential h-6 w-6 text-success",
  statIconFocus: "icon-nonessential h-6 w-6 text-focus",
  statIconPrimary: "icon-nonessential h-6 w-6 text-primary",
  statValue: "text-3xl font-display font-bold text-foreground",
  statLabel: "text-sm text-muted-foreground",
} as const;
