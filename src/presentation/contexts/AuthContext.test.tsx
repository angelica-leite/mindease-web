import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";

import { AuthProvider } from "@/presentation/contexts/AuthContext";
import { useAuth } from "@/presentation/hooks/useAuth";

function wrapper({ children }: { readonly children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

describe("AuthContext", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.cookie = "mindease_session=; Path=/; Max-Age=0";
  });

  it("registers user and starts session", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      const registerResult = result.current.register({
        name: "Ana Souza",
        email: "ana@example.com",
        password: "123456",
      });
      expect(registerResult.ok).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.profile?.name).toBe("Ana Souza");
    expect(result.current.profile?.email).toBe("ana@example.com");

    const storedUsersRaw = window.localStorage.getItem("mindease-auth-users");
    const storedSessionRaw = window.localStorage.getItem("mindease-auth-session");

    expect(storedUsersRaw).not.toBeNull();
    expect(storedSessionRaw).not.toBeNull();
  });

  it("does not login with invalid credentials", async () => {
    window.localStorage.setItem(
      "mindease-auth-users",
      JSON.stringify([
        {
          id: "user-1",
          name: "Pedro",
          email: "pedro@example.com",
          password: "123456",
          provider: "email",
          createdAt: "2026-01-01T00:00:00.000Z",
        },
      ]),
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let loginResult: { ok: boolean; error?: string } = { ok: true };
    act(() => {
      loginResult = result.current.login({
        email: "pedro@example.com",
        password: "senha-errada",
      });
    });

    expect(loginResult.ok).toBe(false);
    expect(loginResult.error).toContain("Senha");
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("restores previous session from localStorage and allows logout", async () => {
    window.localStorage.setItem(
      "mindease-auth-session",
      JSON.stringify({
        profile: {
          id: "u-9",
          name: "Carla",
          email: "carla@example.com",
          provider: "email",
          createdAt: "2026-02-01T00:00:00.000Z",
        },
        signedInAt: "2026-02-10T10:00:00.000Z",
      }),
    );

    const { result } = renderHook(() => useAuth(), { wrapper });
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.profile?.email).toBe("carla@example.com");

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(window.localStorage.getItem("mindease-auth-session")).toBeNull();
  });
});
