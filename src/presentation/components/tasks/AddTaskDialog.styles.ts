export const addTaskDialogClasses = {
  dialogContent: "sm:max-w-md",
  dialogTitle: "font-display",
  form: "space-y-5",
  field: "space-y-2",
  titleInput: "text-base",
  priorityGroup: "flex gap-2",
  priorityOptionBase:
    "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 transition-all",
  priorityOptionSelected: "border-primary bg-primary/5",
  priorityOptionDefault: "border-border hover:border-muted-foreground",
  priorityDot: "h-2.5 w-2.5 rounded-full",
  priorityLabel: "text-sm font-medium",
  footer: "flex gap-3 pt-2",
  footerButton: "flex-1",
} as const;
