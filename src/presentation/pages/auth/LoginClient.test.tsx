import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import LoginClient from "@/presentation/pages/auth/LoginClient";
import { useAuth } from "@/presentation/hooks/useAuth";

const replaceMock = jest.fn();
const useSearchParamsMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: replaceMock,
  }),
  useSearchParams: () => useSearchParamsMock(),
}));

jest.mock("@/presentation/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

const useAuthMock = useAuth as jest.MockedFunction<typeof useAuth>;

describe("LoginClient", () => {
  beforeEach(() => {
    replaceMock.mockReset();
    useSearchParamsMock.mockReset();
    useSearchParamsMock.mockReturnValue(new URLSearchParams());
  });

  it("submits credentials and redirects to next path", async () => {
    const user = userEvent.setup();
    const login = jest.fn().mockReturnValue({ ok: true });

    useAuthMock.mockReturnValue({
      profile: null,
      isAuthenticated: false,
      isLoading: false,
      register: jest.fn(),
      login,
      logout: jest.fn(),
    });
    useSearchParamsMock.mockReturnValue(new URLSearchParams("next=%2Ftasks"));

    render(<LoginClient />);

    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.type(screen.getByLabelText("Senha"), "123456");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(login).toHaveBeenCalledWith({
      email: "ana@example.com",
      password: "123456",
    });
    expect(replaceMock).toHaveBeenCalledWith("/tasks");
  });

  it("shows error when login fails", async () => {
    const user = userEvent.setup();
    const login = jest.fn().mockReturnValue({
      ok: false,
      error: "Credenciais invalidas",
    });

    useAuthMock.mockReturnValue({
      profile: null,
      isAuthenticated: false,
      isLoading: false,
      register: jest.fn(),
      login,
      logout: jest.fn(),
    });

    render(<LoginClient />);

    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.type(screen.getByLabelText("Senha"), "wrong");
    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(screen.getByText("Credenciais invalidas")).toBeInTheDocument();
    expect(replaceMock).not.toHaveBeenCalled();
  });
});
