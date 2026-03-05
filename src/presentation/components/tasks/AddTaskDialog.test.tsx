import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { AddTaskDialog } from "@/presentation/components/tasks/AddTaskDialog";

describe("AddTaskDialog", () => {
  it("submits a valid task payload", async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();
    const onOpenChange = jest.fn();

    render(<AddTaskDialog open onOpenChange={onOpenChange} onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/titulo/i), "  Criar testes  ");
    await user.type(screen.getByLabelText(/descricao/i), "  Cobrir modulo de tarefas  ");
    await user.click(screen.getByRole("button", { name: "Alta" }));
    await user.type(screen.getByLabelText(/tempo estimado/i), "35");
    await user.click(screen.getByRole("button", { name: /criar tarefa/i }));

    expect(onAdd).toHaveBeenCalledWith({
      title: "Criar testes",
      description: "Cobrir modulo de tarefas",
      status: "todo",
      priority: "high",
      estimatedMinutes: 35,
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("does not submit when title is empty", async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();

    render(<AddTaskDialog open onOpenChange={jest.fn()} onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: /criar tarefa/i }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("closes dialog on cancel", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();

    render(<AddTaskDialog open onOpenChange={onOpenChange} onAdd={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /cancelar/i }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
