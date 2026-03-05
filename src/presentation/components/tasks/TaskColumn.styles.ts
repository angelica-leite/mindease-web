export const taskColumnClasses = {
  root: "rounded-2xl p-4",
  header: "mb-4 flex items-center justify-between",
  titleGroup: "flex items-center gap-2",
  accentDot: "h-3 w-3 rounded-full",
  title: "font-display font-semibold text-foreground",
  count: "text-sm text-muted-foreground",
  addButton: "flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80",
  addIcon: "h-4 w-4",
  tasksStack: "space-y-3",
  emptyState: "py-8 text-center",
  emptyText: "text-sm text-muted-foreground",
} as const;
