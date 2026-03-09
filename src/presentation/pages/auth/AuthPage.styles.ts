export const authPageClasses = {
  page: "relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10",
  background:
    "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,hsl(168_50%_42%/.3),transparent_36%),radial-gradient(circle_at_80%_4%,hsl(25_80%_70%/.22),transparent_30%),radial-gradient(circle_at_52%_96%,hsl(200_45%_50%/.18),transparent_34%)]",
  card: "relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-border/80 bg-card/95 p-6 shadow-2xl backdrop-blur-sm md:p-8",
  cardSheen:
    "pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,hsl(168_50%_42%/.14),transparent)]",
  cardBody: "relative",
  brandRow: "mb-6 flex items-center justify-center gap-3",
  brandIconWrap:
    "flex h-11 w-11 items-center justify-center rounded-2xl bg-sidebar-primary shadow-lg",
  brandIcon: "icon-nonessential h-6 w-6 text-primary-foreground",
  brand: "font-display text-2xl font-semibold text-foreground",
  title: "text-center text-2xl font-display font-semibold text-foreground",
  subtitle: "mt-1 text-center text-sm text-muted-foreground",
  form: "mt-7 space-y-4",
  field: "space-y-1.5",
  fieldLabel: "block text-sm font-medium text-foreground",
  inputWrap:
    "flex items-center gap-2 rounded-xl border border-input/90 bg-background/70 px-3 ring-offset-background transition-colors focus-within:border-primary/70",
  fieldIcon: "h-4 w-4 text-muted-foreground",
  input:
    "h-11 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:border-transparent",
  actions:
    "bg-sidebar-primary rounded-lg hover:bg-sidebar-primary cursor-pointer transition-all mt-6 space-y-3",
  submitButton:
    "bg-sidebar-primary rounded-lg hover:bg-sidebar-primary cursor-pointer transition-all h-11 w-full rounded-xl text-primary-foreground shadow-lg transition-all hover:brightness-105",
  hintBox: "rounded-xl border border-border/70 bg-muted/40 px-3 py-2 text-xs text-muted-foreground",
  error:
    "rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive",
  footer: "mt-6 text-center text-sm text-muted-foreground",
  footerLink: "font-medium text-primary hover:underline underline-offset-4",
} as const;
