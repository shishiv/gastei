import type { Plan } from "@/types";

export const plans: Plan[] = [
  {
    id: "gratis",
    name: "Gratis",
    price: 0,
    period: "/mes",
    description: "Perfeito para comecar",
    features: [
      "30 gastos por mes",
      "Categorizacao automatica",
      "Resumo mensal no WhatsApp",
      "Suporte por email",
    ],
    limits: "30 gastos/mes",
  },
  {
    id: "duo",
    name: "Duo",
    price: 19.9,
    period: "/mes",
    description: "Para voce e seu parceiro(a)",
    features: [
      "Gastos ilimitados",
      "2 membros",
      "Categorizacao automatica",
      "Resumo mensal no WhatsApp",
      "Dashboard compartilhado",
      "Exportacao CSV",
      "Suporte prioritario",
    ],
    limits: "Ilimitado · 2 membros",
    highlighted: true,
    badge: "Ideal para Casais",
  },
  {
    id: "familiar",
    name: "Familiar",
    price: 34.9,
    period: "/mes",
    description: "Para toda a familia",
    features: [
      "Gastos ilimitados",
      "Ate 5 membros",
      "Categorizacao automatica",
      "Resumo mensal no WhatsApp",
      "Dashboard compartilhado",
      "Exportacao CSV e PDF",
      "Suporte prioritario",
    ],
    limits: "Ilimitado · ate 5 membros",
  },
];
