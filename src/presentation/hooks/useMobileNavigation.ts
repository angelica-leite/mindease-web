"use client";

import { useState } from "react";

export function useMobileNavigation() {
  const [open, setOpen] = useState(false);

  return {
    open,
    onOpenChange: setOpen,
  };
}
