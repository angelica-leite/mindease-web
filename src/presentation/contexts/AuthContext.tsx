"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { clearAuthCookie, setAuthCookie } from "@/presentation/lib/auth-cookie";

type AuthProvider = "email";

interface StoredUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly provider: AuthProvider;
  readonly createdAt: string;
  readonly password?: string;
}

export interface AuthProfile {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly provider: AuthProvider;
  readonly createdAt: string;
}

interface AuthSession {
  readonly profile: AuthProfile;
  readonly signedInAt: string;
}

interface RegisterInput {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

interface LoginInput {
  readonly email: string;
  readonly password: string;
}

interface AuthResult {
  readonly ok: boolean;
  readonly error?: string;
}

interface AuthContextValue {
  readonly profile: AuthProfile | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  register(input: RegisterInput): AuthResult;
  login(input: LoginInput): AuthResult;
  logout(): void;
}

const USERS_STORAGE_KEY = "mindease-auth-users";
const SESSION_STORAGE_KEY = "mindease-auth-session";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function getBrowserSafeUuid() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: readonly StoredUser[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function readSession(): AuthSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed?.profile?.email) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeSession(session: AuthSession | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!session) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    clearAuthCookie();
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  setAuthCookie();
}

function extractProfile(user: StoredUser): AuthProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    createdAt: user.createdAt,
  };
}

export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [users, setUsers] = useState<StoredUser[]>([]);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      const storedUsers = readUsers();
      const storedSession = readSession();

      setUsers(storedUsers);
      setSession(storedSession);

      if (storedSession) {
        setAuthCookie();
      } else {
        clearAuthCookie();
      }

      setIsLoading(false);
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const startSession = useCallback((user: StoredUser) => {
    const profile = extractProfile(user);
    const nextSession: AuthSession = {
      profile,
      signedInAt: new Date().toISOString(),
    };

    setSession(nextSession);
    writeSession(nextSession);
  }, []);

  const register = useCallback(
    (input: RegisterInput): AuthResult => {
      const name = input.name.trim();
      const email = normalizeEmail(input.email);
      const password = input.password;

      if (name.length < 2) {
        return { ok: false, error: "Informe um nome com pelo menos 2 caracteres." };
      }
      if (!EMAIL_REGEX.test(email)) {
        return { ok: false, error: "Informe um e-mail válido." };
      }
      if (password.length < 6) {
        return { ok: false, error: "A senha deve ter pelo menos 6 caracteres." };
      }

      if (users.some((user) => user.email === email)) {
        return { ok: false, error: "Este e-mail já está cadastrado." };
      }

      const now = new Date().toISOString();
      const nextUser: StoredUser = {
        id: getBrowserSafeUuid(),
        name,
        email,
        password,
        provider: "email",
        createdAt: now,
      };

      const nextUsers = [...users, nextUser];
      setUsers(nextUsers);
      writeUsers(nextUsers);
      startSession(nextUser);

      return { ok: true };
    },
    [startSession, users],
  );

  const login = useCallback(
    (input: LoginInput): AuthResult => {
      const email = normalizeEmail(input.email);
      const user = users.find((candidate) => candidate.email === email);

      if (!user) {
        return { ok: false, error: "Usuário não encontrado." };
      }

      if (user.password !== input.password) {
        return { ok: false, error: "Senha inválida." };
      }

      startSession(user);
      return { ok: true };
    },
    [startSession, users],
  );

  const logout = useCallback(() => {
    setSession(null);
    writeSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      profile: session?.profile ?? null,
      isAuthenticated: Boolean(session?.profile),
      isLoading,
      register,
      login,
      logout,
    }),
    [isLoading, login, logout, register, session?.profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
}
