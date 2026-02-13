"use client";

import { MessageSquare, Camera, Mic, Sparkles, BarChart3, Users } from "lucide-react";
import { ScrollReveal } from "@/components/animations/scroll-reveal";

const steps = [
  {
    icon: MessageSquare,
    title: "Manda mensagem",
    description:
      "Texto, foto ou audio. Do jeito que voce preferir, no seu WhatsApp.",
    color: "blue" as const,
  },
  {
    icon: Sparkles,
    title: "IA extrai dados",
    description:
      "Nossa inteligencia artificial identifica valor, categoria e local automaticamente.",
    color: "teal" as const,
  },
  {
    icon: BarChart3,
    title: "Acompanhe tudo",
    description:
      "Acompanhe os gastos do casal ou individuais, direto no WhatsApp ou no dashboard compartilhado.",
    color: "accent" as const,
  },
];

const features = [
  {
    icon: Camera,
    title: "OCR Inteligente",
    description:
      "Tire foto do comprovante e a IA extrai todos os dados automaticamente.",
  },
  {
    icon: Mic,
    title: "Reconhecimento de Voz",
    description:
      'Fale naturalmente, como "gastei 30 reais no Uber". A IA entende tudo.',
  },
  {
    icon: Users,
    title: "Dashboard Compartilhado",
    description:
      "Casais e familias veem todos os gastos num so lugar, dividido por pessoa.",
  },
];

const colorMap = {
  blue: {
    bg: "from-gastei-blue/20 to-gastei-blue/5",
    icon: "text-gastei-blue",
  },
  teal: {
    bg: "from-gastei-teal/20 to-gastei-teal/5",
    icon: "text-gastei-teal",
  },
  accent: {
    bg: "from-gastei-accent/20 to-gastei-accent/5",
    icon: "text-gastei-accent",
  },
};

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como funciona o{" "}
            <span className="text-gastei-gradient">Gastei</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tres passos para organizar as financas do casal sem complicacao
          </p>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.15}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gastei-blue/30 to-transparent" />
              )}

              {/* Icon */}
              <div
                className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-gastei group-hover:shadow-gastei-lg transition-all group-hover:-translate-y-1 ${colorMap[step.color].bg}`}
              >
                <step.icon
                  className={`w-10 h-10 ${colorMap[step.color].icon}`}
                />
              </div>

              {/* Step Number */}
              <div className="absolute top-0 right-1/3 w-8 h-8 rounded-full bg-gastei-blue text-white text-sm font-bold flex items-center justify-center">
                {index + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
              className="p-6 rounded-2xl bg-gastei-gray-50 hover:bg-white hover:shadow-gastei border border-transparent hover:border-border/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gastei-blue/10 flex items-center justify-center mb-4 group-hover:bg-gastei-blue group-hover:text-white transition-colors">
                <feature.icon className="w-6 h-6 text-gastei-blue group-hover:text-white" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
