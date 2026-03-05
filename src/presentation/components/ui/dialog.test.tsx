import { render, screen } from "@testing-library/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";

describe("Dialog", () => {
  it("renders content when open", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Titulo</DialogTitle>
            <DialogDescription>Descricao</DialogDescription>
          </DialogHeader>
          <DialogFooter>Footer</DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText("Titulo")).toBeInTheDocument();
    expect(screen.getByText("Descricao")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("hides top close button when showCloseButton is false", () => {
    render(
      <Dialog open>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Titulo sem close</DialogTitle>
            <DialogDescription>Descricao sem close</DialogDescription>
          </DialogHeader>
          Conteudo
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByText("Close")).not.toBeInTheDocument();
  });

  it("renders footer close button when enabled", () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Titulo com footer</DialogTitle>
            <DialogDescription>Descricao com footer</DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>Actions</DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getAllByRole("button", { name: "Close" })).toHaveLength(2);
  });
});
