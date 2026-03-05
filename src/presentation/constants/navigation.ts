import {
  LayoutDashboard,
  CheckSquare,
  Timer,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  readonly path: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

export const navigationItems: readonly NavigationItem[] = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Painel" },
  { path: "/tasks", icon: CheckSquare, label: "Tarefas" },
  { path: "/pomodoro", icon: Timer, label: "Foco" },
  { path: "/profile", icon: User, label: "Perfil" },
  { path: "/settings", icon: Settings, label: "Configurações" },
] as const;

export function isNavigationItemActive(
  pathname: string | null,
  itemPath: string,
) {
  return (
    pathname === itemPath ||
    (itemPath !== "/dashboard" && pathname?.startsWith(itemPath))
  );
}
