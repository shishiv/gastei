"use server";

import { z } from "zod/v4";

const waitlistSchema = z.object({
  email: z.email("Email invalido"),
  phone: z.string().optional(),
});

export type WaitlistState = {
  success: boolean;
  message: string;
} | null;

export async function joinWaitlist(
  _prev: WaitlistState,
  formData: FormData
): Promise<WaitlistState> {
  const raw = {
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
  };

  const result = waitlistSchema.safeParse(raw);

  if (!result.success) {
    return {
      success: false,
      message: result.error.issues[0]?.message ?? "Dados invalidos",
    };
  }

  // TODO: Persist to Vercel Postgres / send via Resend
  console.log("[waitlist] New entry:", result.data);

  return {
    success: true,
    message: "Voce esta na lista! Avisaremos quando estiver pronto.",
  };
}
