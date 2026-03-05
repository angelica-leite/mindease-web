"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import {
  navigationItems,
  isNavigationItemActive,
} from "@/presentation/constants/navigation";

export function useNavigation() {
  const pathname = usePathname();

  const items = useMemo(
    () =>
      navigationItems.map((item) => ({
        ...item,
        isActive: isNavigationItemActive(pathname, item.path),
      })),
    [pathname],
  );

  return {
    items,
  };
}
