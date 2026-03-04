"use client";

import { useState } from "react";

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

import type { Task, TaskPriority } from "@/presentation/types/tasks";
import { cn } from "@/presentation/lib/utils";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (task: Omit<Task, "id" | "createdAt">) => void;
}

const priorities: { value: TaskPriority; label: string; color: string }[] = [
  { value: "low", label: "Baixa", color: "bg-success" },
  { value: "medium", label: "Média", color: "bg-warning" },
  { value: "high", label: "Alta", color: "bg-destructive" },
];

export function AddTaskDialog({
  open,
  onOpenChange,
  onAdd,
}: AddTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [estimatedMinutes, setEstimatedMinutes] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const safeTitle = title.trim();
    if (!safeTitle) return;

    const minutes = estimatedMinutes ? Number(estimatedMinutes) : undefined;
    const safeMinutes =
      minutes && Number.isFinite(minutes) && minutes > 0
        ? Math.trunc(minutes)
        : undefined;

    onAdd({
      title: safeTitle,
      description: description.trim() || undefined,
      status: "todo",
      priority,
      estimatedMinutes: safeMinutes,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("medium");
    setEstimatedMinutes("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">Nova Tarefa</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="O que você precisa fazer?"
              className="text-base"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione detalhes..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Prioridade</Label>
            <div className="flex gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all",
                    priority === p.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground",
                  )}
                >
                  <div className={cn("h-2.5 w-2.5 rounded-full", p.color)} />
                  <span className="text-sm font-medium">{p.label}</span>
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
              onChange={(e) => setEstimatedMinutes(e.target.value)}
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
              onClick={() => onOpenChange(false)}
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
