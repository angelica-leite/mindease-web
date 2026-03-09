import { renderHook } from "@testing-library/react";

import { useAuth } from "@/presentation/hooks/useAuth";
import { useFocusStats } from "@/presentation/hooks/useFocusStats";
import { usePomodoroPageViewModel } from "@/presentation/hooks/usePomodoroPageViewModel";
import { usePomodoro } from "@/presentation/hooks/usePomodoro";

jest.mock("@/presentation/hooks/usePomodoro", () => ({
  usePomodoro: jest.fn(),
}));
jest.mock("@/presentation/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));
jest.mock("@/presentation/hooks/useFocusStats", () => ({
  useFocusStats: jest.fn(),
}));

const usePomodoroMock = usePomodoro as jest.MockedFunction<typeof usePomodoro>;
const useAuthMock = useAuth as jest.MockedFunction<typeof useAuth>;
const useFocusStatsMock = useFocusStats as jest.MockedFunction<typeof useFocusStats>;

describe("usePomodoroPageViewModel", () => {
  beforeEach(() => {
    useAuthMock.mockReturnValue({
      profile: {
        id: "u-1",
        name: "Ana",
        email: "ana@example.com",
        provider: "email",
        createdAt: "2026-01-01T00:00:00.000Z",
      },
      isAuthenticated: true,
      isLoading: false,
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    });

    useFocusStatsMock.mockReturnValue({
      stats: {
        completedFocusSessions: 0,
        totalFocusSeconds: 0,
      },
      addFocusSecond: jest.fn(),
      registerCompletedSession: jest.fn(),
    });
  });

  it("returns focused mode only when working and running", () => {
    usePomodoroMock.mockReturnValue({
      phase: "work",
      timeLeft: 1200,
      formattedTime: "20:00",
      isRunning: true,
      completedCycles: 1,
      progress: 10,
      startWork: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      reset: jest.fn(),
      skip: jest.fn(),
    });

    const { result } = renderHook(() => usePomodoroPageViewModel());

    expect(result.current.showFocusedMode).toBe(true);
    expect(result.current.tips).toHaveLength(3);
    expect(useFocusStatsMock).toHaveBeenCalledWith("u-1");
  });

  it("disables focused mode outside active work phase", () => {
    usePomodoroMock.mockReturnValue({
      phase: "shortBreak",
      timeLeft: 120,
      formattedTime: "02:00",
      isRunning: true,
      completedCycles: 1,
      progress: 50,
      startWork: jest.fn(),
      pause: jest.fn(),
      resume: jest.fn(),
      reset: jest.fn(),
      skip: jest.fn(),
    });

    const { result } = renderHook(() => usePomodoroPageViewModel());
    expect(result.current.showFocusedMode).toBe(false);
  });
});
