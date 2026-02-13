"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Plan } from "@/types";
import { formatCurrency } from "@/data/categories";

interface PlanCardProps {
  plan: Plan;
  onWaitlistOpen: () => void;
}

export function PlanCard({ plan, onWaitlistOpen }: PlanCardProps) {
  const isFree = plan.price === 0;

  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 transition-all duration-300 hover:shadow-gastei-lg ${
        plan.highlighted
          ? "bg-gastei-gradient text-white shadow-gastei scale-105"
          : "bg-white border border-border hover:border-primary/30"
      }`}
    >
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {plan.badge ?? "Mais Popular"}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3
          className={`text-xl font-bold mb-2 ${
            plan.highlighted ? "text-white" : "text-foreground"
          }`}
        >
          {plan.name}
        </h3>
        <p
          className={`text-sm ${
            plan.highlighted ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {plan.description}
        </p>
      </div>

      <div className="mb-6">
        <span
          className={`text-4xl font-bold ${
            plan.highlighted ? "text-white" : "text-foreground"
          }`}
        >
          {isFree ? "Gratis" : formatCurrency(plan.price)}
        </span>
        {!isFree && (
          <span
            className={`text-sm ${
              plan.highlighted ? "text-white/80" : "text-muted-foreground"
            }`}
          >
            {plan.period}
          </span>
        )}
      </div>

      <div className="mb-6">
        <span
          className={`inline-block text-xs font-medium px-3 py-1 rounded-full ${
            plan.highlighted
              ? "bg-white/20 text-white"
              : "bg-primary/10 text-primary"
          }`}
        >
          {plan.limits}
        </span>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                plan.highlighted ? "text-white" : "text-gastei-blue"
              }`}
            />
            <span
              className={`text-sm ${
                plan.highlighted ? "text-white/90" : "text-muted-foreground"
              }`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        onClick={onWaitlistOpen}
        className={`w-full rounded-full font-medium transition-all ${
          plan.highlighted
            ? "bg-white text-gastei-blue hover:bg-white/90"
            : "bg-gastei-blue text-white hover:bg-gastei-blue-dark"
        }`}
      >
        {isFree ? "Comecar Gratis" : "Assinar Agora"}
      </Button>
    </div>
  );
}
