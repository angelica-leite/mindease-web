import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TaskColumn } from "@/presentation/components/tasks/TaskColumn";
import type { Task } from "@/presentation/types/tasks";

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
    <div data-testid={`task-card-${task.id}`}>
      <button type="button" onClick={() => onStatusChange("done")}>
        status-{task.id}
      </button>
      <button type="button" onClick={() => onChecklistToggle("item-1")}>
        checklist-{task.id}
      </button>
    </div>
  ),
}));

const tasks: Task[] = [
  {
    id: "task-1",
    title: "Task 1",
    status: "todo",
    priority: "low",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
  {
    id: "task-2",
    title: "Task 2",
    status: "todo",
    priority: "high",
    createdAt: new Date("2026-01-01T10:00:00.000Z"),
  },
];

describe("TaskColumn", () => {
  it("renders title, count and add button for todo column", async () => {
    const user = userEvent.setup();
    const onAddTask = jest.fn();

    render(
      <TaskColumn
        status="todo"
        tasks={tasks}
        onStatusChange={jest.fn()}
        onChecklistToggle={jest.fn()}
        onAddTask={onAddTask}
      />,
    );

    expect(screen.getByText("A Fazer")).toBeInTheDocument();
    expect(screen.getByText("(2)")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /adicionar/i }));
    expect(onAddTask).toHaveBeenCalledTimes(1);
  });

  it("wires task callbacks with task id", async () => {
    const user = userEvent.setup();
    const onStatusChange = jest.fn();
    const onChecklistToggle = jest.fn();

    render(
      <TaskColumn
        status="todo"
        tasks={tasks}
        onStatusChange={onStatusChange}
        onChecklistToggle={onChecklistToggle}
      />,
    );

    await user.click(screen.getByRole("button", { name: "status-task-1" }));
    await user.click(screen.getByRole("button", { name: "checklist-task-2" }));

    expect(onStatusChange).toHaveBeenCalledWith("task-1", "done");
    expect(onChecklistToggle).toHaveBeenCalledWith("task-2", "item-1");
  });

  it("shows empty state when there are no tasks", () => {
    render(
      <TaskColumn
        status="done"
        tasks={[]}
        onStatusChange={jest.fn()}
        onChecklistToggle={jest.fn()}
      />,
    );

    expect(screen.getByText("Nenhuma tarefa aqui")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /adicionar/i })).not.toBeInTheDocument();
  });
});
