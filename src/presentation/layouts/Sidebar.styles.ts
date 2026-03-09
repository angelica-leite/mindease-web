export const sidebarClasses = {
  root: "fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar md:block",
  content: "flex h-full flex-col px-4 py-6",
  brandLink: "mb-8 flex items-center gap-3 px-2",
  brandIconWrapper:
    "icon-parent flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary",
  brandIcon: "icon-nonessential h-6 w-6 text-primary-foreground",
  brandText: "font-display text-xl font-semibold text-sidebar-foreground",
  nav: "flex-1 space-y-1",
  navItemBase:
    "flex items-center gap-3 rounded-xl px-4 py-3 text-sidebar-foreground transition-all",
  navItemActive: "bg-sidebar-primary text-sidebar-primary-foreground",
  navItemDefault: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  navItemIcon: "icon-nonessential h-5 w-5",
  navItemLabel: "font-medium",
  footer: "space-y-3 border-t border-sidebar-border pt-4",
  userInfo: "rounded-xl border border-sidebar-border/60 bg-sidebar-accent/30 px-3 py-2",
  userName: "truncate text-sm font-medium text-sidebar-foreground",
  userEmail: "truncate text-xs text-muted-foreground",
  logoutButton:
    "flex items-center gap-3 w-full rounded-xl border border-sidebar-border bg-sidebar px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent cursor-pointer",
  footerText: "text-center text-xs text-muted-foreground",
} as const;
