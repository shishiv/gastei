export type Category =
  | "alimentacao"
  | "transporte"
  | "moradia"
  | "saude"
  | "educacao"
  | "lazer"
  | "mercado"
  | "vestuario"
  | "servicos"
  | "outros";

export interface CategoryInfo {
  id: Category;
  name: string;
  emoji: string;
  color: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  limits: string;
  highlighted?: boolean;
  badge?: string;
}

export interface WaitlistEntry {
  email: string;
  phone?: string;
}
