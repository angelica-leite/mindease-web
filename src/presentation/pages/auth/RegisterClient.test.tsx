import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import RegisterClient from "@/presentation/pages/auth/RegisterClient";
import { useAuth } from "@/presentation/hooks/useAuth";

const replaceMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
}));

jest.mock("@/presentation/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

const useAuthMock = useAuth as jest.MockedFunction<typeof useAuth>;

describe("RegisterClient", () => {
  beforeEach(() => {
    replaceMock.mockReset();
  });

  it("submits registration payload and redirects", async () => {
    const user = userEvent.setup();
    const register = jest.fn().mockReturnValue({ ok: true });

    useAuthMock.mockReturnValue({
      profile: null,
      isAuthenticated: false,
      isLoading: false,
      register,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<RegisterClient />);

    await user.type(screen.getByLabelText("Nome"), "Ana Souza");
    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(register).toHaveBeenCalledWith({
      name: "Ana Souza",
      email: "ana@example.com",
      password: "123456",
    });
    expect(replaceMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows returned error when registration fails", async () => {
    const user = userEvent.setup();
    const register = jest.fn().mockReturnValue({
      ok: false,
      error: "E-mail ja cadastrado",
    });

    useAuthMock.mockReturnValue({
      profile: null,
      isAuthenticated: false,
      isLoading: false,
      register,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(<RegisterClient />);

    await user.type(screen.getByLabelText("Nome"), "Ana Souza");
    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Cadastrar" }));

    expect(screen.getByText("E-mail ja cadastrado")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
