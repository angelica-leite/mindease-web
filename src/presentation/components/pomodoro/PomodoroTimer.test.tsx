import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Brain } from "lucide-react";

import { PomodoroTimer } from "@/presentation/components/pomodoro/PomodoroTimer";
import { usePomodoroViewModel } from "@/presentation/hooks/usePomodoroViewModel";

jest.mock("@/presentation/hooks/usePomodoroViewModel", () => ({
  usePomodoroViewModel: jest.fn(),
}));

const usePomodoroViewModelMock = usePomodoroViewModel as jest.MockedFunction<
  typeof usePomodoroViewModel
>;

describe("PomodoroTimer", () => {
  it("renders idle state and starts work", async () => {
    const user = userEvent.setup();
    const startWork = jest.fn();

    usePomodoroViewModelMock.mockReturnValue({
      phase: "idle",
      phaseState: {
        label: "Pronto para focar?",
        color: "text-muted-foreground",
        icon: Brain,
      },
      progress: 0,
      completedCycles: 0,
      isRunning: false,
      circleCircumference: 753.98,
      strokeDashoffset: 753.98,
      strokeColor: "hsl(var(--success))",
      isIdle: true,
      showCycleCounter: false,
      cycleIndicators: Array.from({ length: 4 }, (_, index) => ({
        index,
        done: false,
      })),
      pauseOrResume: jest.fn(),
      cyclesUntilLongBreak: 4,
      timeLeft: 1500,
      formattedTime: "25:00",
      startWork,
      reset: jest.fn(),
      skip: jest.fn(),
    });

    render(<PomodoroTimer />);

    await user.click(screen.getByRole("button", { name: /iniciar foco/i }));
    expect(startWork).toHaveBeenCalledTimes(1);
  });

  it("renders running controls and triggers callbacks", async () => {
    const user = userEvent.setup();
    const reset = jest.fn();
    const pauseOrResume = jest.fn();
    const skip = jest.fn();

    usePomodoroViewModelMock.mockReturnValue({
      phase: "work",
      phaseState: {
        label: "Tempo de Foco",
        color: "text-focus",
        icon: Brain,
      },
      progress: 40,
      completedCycles: 2,
      isRunning: true,
      circleCircumference: 753.98,
      strokeDashoffset: 400,
      strokeColor: "hsl(var(--focus))",
      isIdle: false,
      showCycleCounter: true,
      cycleIndicators: Array.from({ length: 4 }, (_, index) => ({
        index,
        done: index < 2,
      })),
      pauseOrResume,
      cyclesUntilLongBreak: 2,
      timeLeft: 900,
      formattedTime: "15:00",
      startWork: jest.fn(),
      reset,
      skip,
    });

    render(<PomodoroTimer />);

    expect(screen.getByText("Ciclo 3")).toBeInTheDocument();
    expect(screen.getByText("2 ciclos ate a pausa longa")).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    await user.click(buttons[0]);
    await user.click(buttons[1]);
    await user.click(buttons[2]);

    expect(reset).toHaveBeenCalledTimes(1);
    expect(pauseOrResume).toHaveBeenCalledTimes(1);
    expect(skip).toHaveBeenCalledTimes(1);
  });
});
