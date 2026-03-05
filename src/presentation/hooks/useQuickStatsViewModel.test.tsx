import { renderHook } from "@testing-library/react";

import { useQuickStatsViewModel } from "@/presentation/hooks/useQuickStatsViewModel";
import type { Task } from "@/domain/entities/task";

const tasks: Task[] = [
  {
    id: "1",
    title: "Todo",
    status: "todo",
    priority: "low",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "2",
    title: "In Progress",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "3",
    title: "Done",
    status: "done",
    priority: "high",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
];

describe("useQuickStatsViewModel", () => {
  it("computes quick stats from tasks", () => {
    const { result } = renderHook(() => useQuickStatsViewModel({ tasks }));

    expect(result.current).toHaveLength(4);
    expect(result.current[0].label).toBe("Concluidas");
    expect(result.current[0].value).toBe(1);
    expect(result.current[1].label).toBe("Em Progresso");
    expect(result.current[1].value).toBe(1);
    expect(result.current[2].label).toBe("Total");
    expect(result.current[2].value).toBe(3);
    expect(result.current[3].label).toBe("Progresso");
    expect(result.current[3].value).toBe("33%");
  });

  it("returns zero progress for empty task list", () => {
    const { result } = renderHook(() => useQuickStatsViewModel({ tasks: [] }));
    expect(result.current[3].value).toBe("0%");
  });
});
