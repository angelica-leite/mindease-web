import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CognitiveAlert } from "@/presentation/components/dashboard/CognitiveAlert";

describe("CognitiveAlert", () => {
  it("renders message and triggers action/dismiss callbacks", async () => {
    const user = userEvent.setup();
    const onDismiss = jest.fn();
    const onAction = jest.fn();

    render(
      <CognitiveAlert
        type="breathe"
        message="Respire por 1 minuto"
        onDismiss={onDismiss}
        onAction={onAction}
        actionLabel="Respirar agora"
      />,
    );

    expect(screen.getByText("Respire por 1 minuto")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Respirar agora" }));
    await user.click(screen.getByRole("button", { name: "Fechar alerta" }));

    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("does not render action button without action config", () => {
    render(
      <CognitiveAlert
        type="focus"
        message="Mantenha o foco"
        onDismiss={jest.fn()}
      />,
    );

    expect(screen.queryByRole("button", { name: /foco/i })).not.toBeInTheDocument();
  });
});
