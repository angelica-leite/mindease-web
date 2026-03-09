"use client";

import { useCallback, useEffect, useState } from "react";

interface FocusStats {
  readonly completedFocusSessions: number;
  readonly totalFocusSeconds: number;
}

interface FocusStatsStorageValue {
  completedFocusSessions?: number;
  totalFocusSeconds?: number;
}

type FocusStatsStorageMap = Record<string, FocusStatsStorageValue>;

const FOCUS_STATS_STORAGE_KEY = "mindease-focus-stats";
const emptyFocusStats: FocusStats = {
  completedFocusSessions: 0,
  totalFocusSeconds: 0,
};

function readStorageMap(): FocusStatsStorageMap {
  if (typeof window === "undefined") {
    return {};
  }

  const raw = window.localStorage.getItem(FOCUS_STATS_STORAGE_KEY);
  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return parsed as FocusStatsStorageMap;
  } catch {
    return {};
  }
}

function writeStorageMap(map: FocusStatsStorageMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(FOCUS_STATS_STORAGE_KEY, JSON.stringify(map));
}

function sanitizeStats(value: FocusStatsStorageValue | undefined): FocusStats {
  return {
    completedFocusSessions: Math.max(0, value?.completedFocusSessions ?? 0),
    totalFocusSeconds: Math.max(0, value?.totalFocusSeconds ?? 0),
  };
}

export function useFocusStats(userId?: string) {
  const [stats, setStats] = useState<FocusStats>(emptyFocusStats);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      if (!userId) {
        setStats(emptyFocusStats);
        return;
      }

      const map = readStorageMap();
      setStats(sanitizeStats(map[userId]));
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [userId]);

  const commit = useCallback(
    (updater: (current: FocusStats) => FocusStats) => {
      if (!userId) {
        return;
      }

      const map = readStorageMap();
      const current = sanitizeStats(map[userId]);
      const next = updater(current);

      map[userId] = next;
      writeStorageMap(map);
      setStats(next);
    },
    [userId],
  );

  const addFocusSecond = useCallback(() => {
    commit((current) => ({
      ...current,
      totalFocusSeconds: current.totalFocusSeconds + 1,
    }));
  }, [commit]);

  const registerCompletedSession = useCallback(() => {
    commit((current) => ({
      ...current,
      completedFocusSessions: current.completedFocusSessions + 1,
    }));
  }, [commit]);

  return {
    stats,
    addFocusSecond,
    registerCompletedSession,
  };
}
