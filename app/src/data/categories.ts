import type { CategoryInfo } from "@/types";

export const categories: CategoryInfo[] = [
  { id: "alimentacao", name: "Alimentacao", emoji: "\u{1F354}", color: "#f59e0b" },
  { id: "transporte", name: "Transporte", emoji: "\u{1F697}", color: "#3b82f6" },
  { id: "moradia", name: "Moradia", emoji: "\u{1F3E0}", color: "#8b5cf6" },
  { id: "saude", name: "Saude", emoji: "\u{1F48A}", color: "#ef4444" },
  { id: "educacao", name: "Educacao", emoji: "\u{1F4DA}", color: "#10b981" },
  { id: "lazer", name: "Lazer", emoji: "\u{1F3AE}", color: "#ec4899" },
  { id: "mercado", name: "Mercado", emoji: "\u{1F6D2}", color: "#f97316" },
  { id: "vestuario", name: "Vestuario", emoji: "\u{1F455}", color: "#6366f1" },
  { id: "servicos", name: "Servicos", emoji: "\u{1F527}", color: "#64748b" },
  { id: "outros", name: "Outros", emoji: "\u{1F4E6}", color: "#94a3b8" },
];

export function getCategoryById(id: string): CategoryInfo {
  return (
    categories.find((cat) => cat.id === id) ??
    categories[categories.length - 1]
  );
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("pt-BR");
}
