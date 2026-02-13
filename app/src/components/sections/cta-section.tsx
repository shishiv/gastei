"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeInUp } from "@/components/animations/motion-wrapper";

// Seeded circle positions to avoid hydration mismatch from Math.random()
const circles = [
  { w: 120, h: 120, left: "5%", top: "10%", opacity: 0.3 },
  { w: 80, h: 80, left: "15%", top: "60%", opacity: 0.2 },
  { w: 150, h: 150, left: "25%", top: "30%", opacity: 0.15 },
  { w: 60, h: 60, left: "35%", top: "80%", opacity: 0.25 },
  { w: 100, h: 100, left: "45%", top: "15%", opacity: 0.2 },
  { w: 140, h: 140, left: "55%", top: "55%", opacity: 0.1 },
  { w: 90, h: 90, left: "65%", top: "25%", opacity: 0.3 },
  { w: 70, h: 70, left: "75%", top: "70%", opacity: 0.2 },
  { w: 110, h: 110, left: "85%", top: "40%", opacity: 0.15 },
  { w: 130, h: 130, left: "92%", top: "8%", opacity: 0.25 },
  { w: 85, h: 85, left: "10%", top: "85%", opacity: 0.2 },
  { w: 95, h: 95, left: "40%", top: "45%", opacity: 0.12 },
  { w: 75, h: 75, left: "60%", top: "90%", opacity: 0.18 },
  { w: 105, h: 105, left: "80%", top: "5%", opacity: 0.22 },
  { w: 65, h: 65, left: "50%", top: "75%", opacity: 0.28 },
];

interface CTASectionProps {
  onWaitlistOpen: () => void;
}

export function CTASection({ onWaitlistOpen }: CTASectionProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gastei-gradient" />

      {/* Seeded Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {circles.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: c.w,
              height: c.h,
              left: c.left,
              top: c.top,
              opacity: c.opacity,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeInUp>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Prontos para organizar as financas juntos?
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Comece gratis e convide quem divide a vida (e as contas) com voce.
          </p>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onWaitlistOpen}
              className="bg-white text-gastei-blue hover:bg-white/90 rounded-full px-8 shadow-lg hover:shadow-xl transition-all text-base font-semibold"
            >
              Comecar Gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 transition-all text-base"
              onClick={() =>
                document
                  .getElementById("como-funciona")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Como funciona a dois
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {["Sem apps", "IA automatica", "Dashboard compartilhado"].map(
              (text) => (
                <span
                  key={text}
                  className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/90"
                >
                  {text}
                </span>
              )
            )}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
