"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { WaitlistForm } from "./waitlist-form";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Entre na Lista de Espera</DialogTitle>
          <DialogDescription>
            Seja um dos primeiros a usar o Gastei. Avisaremos assim que estiver pronto.
          </DialogDescription>
        </DialogHeader>
        <WaitlistForm />
      </DialogContent>
    </Dialog>
  );
}
