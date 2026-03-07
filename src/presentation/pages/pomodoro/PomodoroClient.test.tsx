import { render, screen } from "@testing-library/react";
import { Brain, Heart, Leaf } from "lucide-react";

import PomodoroClient from "@/presentation/pages/pomodoro/PomodoroClient";
import { usePomodoroPageViewModel } from "@/presentation/hooks/usePomodoroPageViewModel";

jest.mock("@/presentation/hooks/usePomodoroPageViewModel", () => ({
  usePomodoroPageViewModel: jest.fn(),
}));

jest.mock("@/presentation/components/pomodoro/PomodoroTimer", () => ({
  PomodoroTimer: () => <div>PomodoroTimerMock</div>,
}));

const usePomodoroPageViewModelMock = usePomodoroPageViewModel as jest.Mock;

describe("PomodoroClient", () => {
  it("renders focused mode layout", () => {
    usePomodoroPageViewModelMock.mockReturnValue({
      controller: {
        phase: "work",
        timeLeft: 1000,
        formattedTime: "16:40",
        isRunning: true,
        completedCycles: 1,
        progress: 20,
        startWork: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        reset: jest.fn(),
        skip: jest.fn(),
      },
      showFocusedMode: true,
      tips: [
        {
          icon: Brain,
          title: "Foco em uma coisa",
          description: "Escolha uma tarefa por vez para reduzir sobrecarga",
        },
        {
          icon: Heart,
          title: "Pause sem culpa",
          description: "Pausas são essenciais para manter a produtividade",
        },
        {
          icon: Leaf,
          title: "Respire",
          description: "Inspire 4s, segure 4s, expire 4s entre ciclos",
        },
      ],
    });

    render(<PomodoroClient />);

    expect(screen.getByText("PomodoroTimerMock")).toBeInTheDocument();
    expect(screen.queryByText("Timer de foco")).not.toBeInTheDocument();
  });

  it("renders default mode with tips", () => {
    usePomodoroPageViewModelMock.mockReturnValue({
      controller: {
        phase: "idle",
        timeLeft: 1500,
        formattedTime: "25:00",
        isRunning: false,
        completedCycles: 0,
        progress: 0,
        startWork: jest.fn(),
        pause: jest.fn(),
        resume: jest.fn(),
        reset: jest.fn(),
        skip: jest.fn(),
      },
      showFocusedMode: false,
      tips: [
        {
          icon: Brain,
          title: "Foco em uma coisa",
          description: "Escolha uma tarefa por vez para reduzir sobrecarga",
        },
        {
          icon: Heart,
          title: "Pause sem culpa",
          description: "Pausas são essenciais para manter a produtividade",
        },
        {
          icon: Leaf,
          title: "Respire",
          description: "Inspire 4s, segure 4s, expire 4s entre ciclos",
        },
      ],
    });

    render(<PomodoroClient />);

    expect(screen.getByText("Timer de foco")).toBeInTheDocument();
    expect(screen.getByText("Foco em uma coisa")).toBeInTheDocument();
    expect(screen.getByText("Pause sem culpa")).toBeInTheDocument();
    expect(screen.getByText("PomodoroTimerMock")).toBeInTheDocument();
  });
});
