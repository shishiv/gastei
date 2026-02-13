"use client";

import type { Plan } from "@/types";
import { PlanCard } from "@/components/cards/plan-card";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

interface PricingSectionClientProps {
  plans: Plan[];
  onWaitlistOpen?: () => void;
}

export function PricingSectionClient({ plans, onWaitlistOpen }: PricingSectionClientProps) {
  const handleOpen = onWaitlistOpen ?? (() => {});

  return (
    <section className="py-20 md:py-32 bg-gastei-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Escolha seu{" "}
            <span className="text-gastei-gradient">plano</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece gratis e upgrade quando precisar. Sem compromisso, cancele
            quando quiser.
          </p>
        </ScrollReveal>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <ScrollReveal key={plan.id} delay={index * 0.12}>
              <PlanCard plan={plan} onWaitlistOpen={handleOpen} />
            </ScrollReveal>
          ))}
        </div>

        {/* Trust Badges */}
        <ScrollReveal delay={0.3}>
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            {["7 dias de garantia", "Cancele quando quiser", "Pagamento seguro"].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-gastei-blue"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
