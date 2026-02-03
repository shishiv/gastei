// Gastei Types

export interface Expense {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  location?: string;
  paymentMethod?: string;
}

export type Category = 
  | 'alimentacao' 
  | 'transporte' 
  | 'moradia' 
  | 'saude' 
  | 'educacao' 
  | 'lazer' 
  | 'mercado' 
  | 'vestuario' 
  | 'servicos' 
  | 'outros';

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
}

export interface User {
  id: string;
  name: string;
  phone: string;
  plan: Plan;
  createdAt: string;
}

export interface MonthlySummary {
  month: string;
  year: number;
  total: number;
  byCategory: Record<Category, number>;
  expenses: Expense[];
}

export interface DashboardData {
  currentMonth: MonthlySummary;
  previousMonth: MonthlySummary;
  recentExpenses: Expense[];
}
