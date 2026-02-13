"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/app/actions/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, Loader2, CheckCircle2 } from "lucide-react";

export function WaitlistForm() {
  const [state, formAction, isPending] = useActionState<WaitlistState, FormData>(
    joinWaitlist,
    null
  );

  if (state?.success) {
    return (
      <div className="text-center py-6">
        <CheckCircle2 className="w-12 h-12 text-gastei-teal mx-auto mb-3" />
        <p className="text-lg font-semibold text-foreground mb-1">Pronto!</p>
        <p className="text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="waitlist-email">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="waitlist-email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="waitlist-phone">WhatsApp (opcional)</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="waitlist-phone"
            name="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            className="pl-10"
          />
        </div>
      </div>

      {state && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-gastei-blue hover:bg-gastei-blue-dark text-white rounded-full"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Enviando...
          </>
        ) : (
          "Entrar na Lista de Espera"
        )}
      </Button>
    </form>
  );
}
