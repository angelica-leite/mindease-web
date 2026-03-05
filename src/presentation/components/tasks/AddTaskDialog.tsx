"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/components/ui/dialog";
import { Button } from "@/presentation/components/ui/button";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Label } from "@/presentation/components/ui/label";

import type { Task } from "@/presentation/types/tasks";
import { cn } from "@/presentation/lib/utils";
import { useAddTaskDialogForm } from "@/presentation/hooks/useAddTaskDialogForm";
import { useAddTaskDialogViewModel } from "@/presentation/hooks/useAddTaskDialogViewModel";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (task: Omit<Task, "id" | "createdAt">) => void;
}

export function AddTaskDialog({
  open,
  onOpenChange,
  onAdd,
}: AddTaskDialogProps) {
  const {
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    estimatedMinutes,
    setEstimatedMinutes,
    submit,
    closeDialog,
  } = useAddTaskDialogForm({ onAdd, onOpenChange });
  const { priorityOptions, isPrioritySelected } =
    useAddTaskDialogViewModel(priority);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Nova Tarefa</DialogTitle>
        </DialogHeader>

        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="O que voce precisa fazer?"
              className="text-base"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descricao (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Adicione detalhes..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Prioridade</Label>
            <div className="flex gap-2">
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 transition-all",
                    isPrioritySelected(option.value)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground",
                  )}
                >
                  <div className={cn("h-2.5 w-2.5 rounded-full", option.color)} />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Tempo estimado (minutos)</Label>
            <Input
              id="time"
              type="number"
              value={estimatedMinutes}
              onChange={(event) => setEstimatedMinutes(event.target.value)}
              placeholder="25"
              min={1}
              max={480}
              inputMode="numeric"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={closeDialog}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1">
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
