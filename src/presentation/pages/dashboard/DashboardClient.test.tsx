import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DashboardClient from "@/presentation/pages/dashboard/DashboardClient";
import { useDashboardViewModel } from "@/presentation/hooks/useDashboardViewModel";
import type { Task } from "@/domain/entities/task";

jest.mock("@/presentation/hooks/useDashboardViewModel", () => ({
  useDashboardViewModel: jest.fn(),
}));

jest.mock("@/presentation/components/dashboard/QuickStats", () => ({
  QuickStats: () => <div>QuickStatsMock</div>,
}));

jest.mock("@/presentation/components/dashboard/CognitiveAlert", () => ({
  CognitiveAlert: ({ onDismiss }: { onDismiss: () => void }) => (
    <button type="button" onClick={onDismiss}>
      AlertMock
    </button>
  ),
}));

jest.mock("@/presentation/components/tasks/TaskCard", () => ({
  TaskCard: ({
    task,
    onStatusChange,
    onChecklistToggle,
  }: {
    task: Task;
    onStatusChange: (status: "todo" | "in-progress" | "done") => void;
    onChecklistToggle: (itemId: string) => void;
  }) => (
    <div>
      <span>{task.title}</span>
      <button type="button" onClick={() => onStatusChange("done")}>
        status-{task.id}
      </button>
      <button type="button" onClick={() => onChecklistToggle("item-1")}>
        checklist-{task.id}
      </button>
    </div>
  ),
}));

const useDashboardViewModelMock =
  useDashboardViewModel as jest.MockedFunction<typeof useDashboardViewModel>;

describe("DashboardClient", () => {
  it("renders sections, tasks and delegates task actions", async () => {
    const user = userEvent.setup();
    const moveTask = jest.fn();
    const toggleChecklistItem = jest.fn();
    const dismissAlert = jest.fn();

    useDashboardViewModelMock.mockReturnValue({
      tasks: [],
      greeting: "Bom dia",
      showAlert: true,
      topInProgressTasks: [
        {
          id: "1",
          title: "Task in progress",
          status: "in-progress",
          priority: "low",
          createdAt: new Date("2026-01-01T10:00:00.000Z"),
        },
      ],
      topTodoTasks: [
        {
          id: "2",
          title: "Task todo",
          status: "todo",
          priority: "high",
          createdAt: new Date("2026-01-01T10:00:00.000Z"),
        },
      ],
      inProgressCount: 1,
      todoCount: 1,
      dismissAlert,
      moveTask,
      toggleChecklistItem,
    });

    render(<DashboardClient />);

    expect(screen.getByText("Bom dia")).toBeInTheDocument();
    expect(screen.getByText("QuickStatsMock")).toBeInTheDocument();
    expect(screen.getByText("Task in progress")).toBeInTheDocument();
    expect(screen.getByText("Task todo")).toBeInTheDocument();

    await user.click(screen.getByText("AlertMock"));
    await user.click(screen.getByRole("button", { name: "status-1" }));
    await user.click(screen.getByRole("button", { name: "checklist-2" }));

    expect(dismissAlert).toHaveBeenCalledTimes(1);
    expect(moveTask).toHaveBeenCalledWith("1", "done");
    expect(toggleChecklistItem).toHaveBeenCalledWith("2", "item-1");
  });

  it("renders empty states when there are no tasks", () => {
    useDashboardViewModelMock.mockReturnValue({
      tasks: [],
      greeting: "Boa tarde",
      showAlert: false,
      topInProgressTasks: [],
      topTodoTasks: [],
      inProgressCount: 0,
      todoCount: 0,
      dismissAlert: jest.fn(),
      moveTask: jest.fn(),
      toggleChecklistItem: jest.fn(),
    });

    render(<DashboardClient />);

    expect(screen.getByText("Nenhuma tarefa em progresso")).toBeInTheDocument();
    expect(screen.getByText("Nenhuma tarefa pendente")).toBeInTheDocument();
  });
});
