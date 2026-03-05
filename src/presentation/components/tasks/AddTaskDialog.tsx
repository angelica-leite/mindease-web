"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { addTaskDialogClasses as styles } from "@/presentation/components/tasks/AddTaskDialog.styles";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (task: Omit<Task, "id" | "createdAt">) => void;
}

export function AddTaskDialog({ open, onOpenChange, onAdd }: AddTaskDialogProps) {
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
  const { priorityOptions, isPrioritySelected } = useAddTaskDialogViewModel(priority);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader>
          <DialogTitle className={styles.dialogTitle}>Nova Tarefa</DialogTitle>
          <DialogDescription>Preencha os campos para criar uma nova tarefa.</DialogDescription>
        </DialogHeader>

        <form onSubmit={submit} className={styles.form}>
          <div className={styles.field}>
            <Label htmlFor="title">Titulo</Label>
            <Input
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="O que voce precisa fazer?"
              className={styles.titleInput}
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <Label htmlFor="description">Descricao (opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Adicione detalhes..."
              rows={3}
            />
          </div>

          <div className={styles.field}>
            <Label>Prioridade</Label>
            <div className={styles.priorityGroup}>
              {priorityOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPriority(option.value)}
                  className={cn(
                    styles.priorityOptionBase,
                    isPrioritySelected(option.value)
                      ? styles.priorityOptionSelected
                      : styles.priorityOptionDefault,
                  )}
                >
                  <div className={cn(styles.priorityDot, option.color)} />
                  <span className={styles.priorityLabel}>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.field}>
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

          <div className={styles.footer}>
            <Button
              type="button"
              variant="outline"
              className={styles.footerButton}
              onClick={closeDialog}
            >
              Cancelar
            </Button>
            <Button type="submit" className={styles.footerButton}>
              Criar Tarefa
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
