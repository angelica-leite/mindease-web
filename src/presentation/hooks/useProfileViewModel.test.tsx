import { renderHook } from "@testing-library/react";

import { useAuth } from "@/presentation/hooks/useAuth";
import { useProfileViewModel } from "@/presentation/hooks/useProfileViewModel";
import { useTasks } from "@/presentation/hooks/useTasks";

jest.mock("@/presentation/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

jest.mock("@/presentation/hooks/useTasks", () => ({
  useTasks: jest.fn(),
}));

const useAuthMock = useAuth as jest.MockedFunction<typeof useAuth>;
const useTasksMock = useTasks as jest.MockedFunction<typeof useTasks>;

describe("useProfileViewModel", () => {
  it("returns profile and completed tasks count", () => {
    useTasksMock.mockReturnValue({
      tasks: [
        {
          id: "1",
          title: "A",
          status: "done",
          priority: "low",
          createdAt: new Date("2026-01-01T00:00:00.000Z"),
        },
        {
          id: "2",
          title: "B",
          status: "todo",
          priority: "high",
          createdAt: new Date("2026-01-01T00:00:00.000Z"),
        },
      ],
      isLoading: false,
      error: null,
      reload: jest.fn(),
      addTask: jest.fn(),
      moveTask: jest.fn(),
      toggleChecklistItem: jest.fn(),
      getTasksByStatus: jest.fn(),
    });

    useAuthMock.mockReturnValue({
      profile: {
        id: "u-1",
        name: "Carla",
        email: "carla@example.com",
        provider: "email",
        createdAt: "2026-01-15T10:00:00.000Z",
      },
      isAuthenticated: true,
      isLoading: false,
      register: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
    });

    const { result } = renderHook(() => useProfileViewModel());

    expect(result.current.completedTasks).toBe(1);
    expect(result.current.profile?.email).toBe("carla@example.com");
    expect(result.current.memberSince).toContain("2026");
  });
});
