import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "@/presentation/components/ui/checkbox";

describe("Checkbox", () => {
  it("calls onCheckedChange when clicked", async () => {
    const user = userEvent.setup();
    const onCheckedChange = jest.fn();

    render(<Checkbox aria-label="check item" onCheckedChange={onCheckedChange} />);

    await user.click(screen.getByRole("checkbox", { name: /check item/i }));

    expect(onCheckedChange).toHaveBeenCalled();
  });

  it("respects checked prop", () => {
    render(<Checkbox aria-label="checked item" checked />);

    expect(screen.getByRole("checkbox", { name: /checked item/i })).toHaveAttribute(
      "data-state",
      "checked",
    );
  });
});
