import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Task } from "@/domain/entities/task";
import { TaskCard } from "@/presentation/components/tasks/TaskCard";

const baseTask: Task = {
  id: "task-1",
  title: "Implementar testes",
  description: "Cobrir os cenarios principais",
  status: "todo",
  priority: "medium",
  createdAt: new Date("2026-01-01T10:00:00.000Z"),
  estimatedMinutes: 30,
  checklist: [
    { id: "item-1", text: "Primeiro item", completed: false },
    { id: "item-2", text: "Segundo item", completed: true },
    { id: "item-3", text: "Terceiro item", completed: false },
    { id: "item-4", text: "Quarto item", completed: false },
  ],
};

describe("TaskCard", () => {
  it("calls onStatusChange with the next status", async () => {
    const user = userEvent.setup();
    const onStatusChange = jest.fn();

    render(
      <TaskCard
        task={baseTask}
        onStatusChange={onStatusChange}
        onChecklistToggle={jest.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /iniciar/i }));

    expect(onStatusChange).toHaveBeenCalledWith("in-progress");
  });

  it("calls onChecklistToggle with item id and shows hidden count", async () => {
    const user = userEvent.setup();
    const onChecklistToggle = jest.fn();

    render(
      <TaskCard
        task={baseTask}
        onStatusChange={jest.fn()}
        onChecklistToggle={onChecklistToggle}
      />,
    );

    expect(screen.getByText("+1 itens")).toBeInTheDocument();

    await user.click(screen.getByText("Primeiro item"));

    expect(onChecklistToggle).toHaveBeenCalledWith("item-1");
  });
});
