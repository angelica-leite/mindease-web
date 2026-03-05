import { render, screen } from "@testing-library/react";

import { QuickStats } from "@/presentation/components/dashboard/QuickStats";
import type { Task } from "@/domain/entities/task";

const tasks: Task[] = [
  {
    id: "1",
    title: "Done",
    status: "done",
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
];

describe("QuickStats", () => {
  it("renders computed stat labels and values", () => {
    render(<QuickStats tasks={tasks} />);

    expect(screen.getByText("Concluidas")).toBeInTheDocument();
    expect(screen.getByText("Em Progresso")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Progresso")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
