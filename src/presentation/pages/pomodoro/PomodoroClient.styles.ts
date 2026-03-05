export const pomodoroClientClasses = {
  focusedWrapper: "fixed inset-0 z-[60] flex items-center justify-center bg-background p-4",
  focusedCard: "mindease-card flex w-full max-w-3xl justify-center py-12",
  page: "space-y-8",
  header: "text-center",
  title: "mb-1 text-3xl font-display font-bold text-foreground",
  description: "text-muted-foreground",
  timerCard: "mindease-card flex justify-center py-12",
  tipsGrid: "grid gap-4 md:grid-cols-3",
  tipCard: "mindease-card text-center",
  tipIconWrapper:
    "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10",
  tipIcon: "h-6 w-6 text-primary",
  tipTitle: "mb-1 font-display font-semibold text-foreground",
  tipDescription: "text-sm text-muted-foreground",
} as const;
