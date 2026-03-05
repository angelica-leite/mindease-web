export const sidebarClasses = {
  root:
    "fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar md:block",
  content: "flex h-full flex-col px-4 py-6",
  brandLink: "mb-8 flex items-center gap-3 px-2",
  brandIconWrapper:
    "flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary",
  brandIcon: "h-6 w-6 text-primary-foreground",
  brandText: "font-display text-xl font-semibold text-sidebar-foreground",
  nav: "flex-1 space-y-1",
  navItemBase:
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground transition-all",
  navItemActive: "bg-sidebar-primary text-sidebar-primary-foreground",
  navItemDefault: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  navItemIcon: "h-5 w-5",
  navItemLabel: "font-medium",
  footer: "border-t border-sidebar-border pt-4",
  footerText: "text-center text-xs text-muted-foreground",
} as const;
