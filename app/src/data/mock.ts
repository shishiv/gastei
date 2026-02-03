import type { CategoryInfo, Plan, Expense, DashboardData } from '@/types';

export const categories: CategoryInfo[] = [
  { id: 'alimentacao', name: 'Alimentação', emoji: '🍔', color: '#f59e0b' },
  { id: 'transporte', name: 'Transporte', emoji: '🚗', color: '#3b82f6' },
  { id: 'moradia', name: 'Moradia', emoji: '🏠', color: '#8b5cf6' },
  { id: 'saude', name: 'Saúde', emoji: '💊', color: '#ef4444' },
  { id: 'educacao', name: 'Educação', emoji: '📚', color: '#10b981' },
  { id: 'lazer', name: 'Lazer', emoji: '🎮', color: '#ec4899' },
  { id: 'mercado', name: 'Mercado', emoji: '🛒', color: '#f97316' },
  { id: 'vestuario', name: 'Vestuário', emoji: '👕', color: '#6366f1' },
  { id: 'servicos', name: 'Serviços', emoji: '🔧', color: '#64748b' },
  { id: 'outros', name: 'Outros', emoji: '📦', color: '#94a3b8' },
];

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '/mês',
    description: 'Perfeito para começar',
    features: [
      '30 gastos por mês',
      'Categorização automática',
      'Resumo mensal no WhatsApp',
      'Suporte por email',
    ],
    limits: '30 gastos/mês',
  },
  {
    id: 'simples',
    name: 'Simples',
    price: 9.90,
    period: '/mês',
    description: 'Para quem quer mais',
    features: [
      '200 gastos por mês',
      'Categorização automática',
      'Resumo mensal no WhatsApp',
      'Exportação CSV',
      'Suporte prioritário',
    ],
    limits: '200 gastos/mês',
    highlighted: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 29.90,
    period: '/mês',
    description: 'Ilimitado para você',
    features: [
      'Gastos ilimitados',
      'Categorização automática',
      'Resumo mensal no WhatsApp',
      'Exportação CSV e PDF',
      'Dashboard completo',
      'Suporte prioritário',
    ],
    limits: 'Ilimitado',
  },
  {
    id: 'familiar',
    name: 'Familiar',
    price: 29.90,
    period: '/mês',
    description: 'Para toda a família',
    features: [
      'Gastos ilimitados',
      'Até 5 membros',
      'Categorização automática',
      'Resumo mensal no WhatsApp',
      'Exportação CSV e PDF',
      'Dashboard compartilhado',
      'Suporte prioritário',
    ],
    limits: 'Ilimitado + 5 membros',
  },
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    amount: 35.00,
    category: 'alimentacao',
    description: 'Almoço iFood',
    date: '2026-01-31',
    location: 'iFood',
  },
  {
    id: '2',
    amount: 50.00,
    category: 'mercado',
    description: 'Compras do mês',
    date: '2026-01-30',
    location: 'Mercado Extra',
  },
  {
    id: '3',
    amount: 25.00,
    category: 'transporte',
    description: 'Uber para reunião',
    date: '2026-01-29',
    location: 'Uber',
  },
  {
    id: '4',
    amount: 120.00,
    category: 'saude',
    description: 'Consulta médica',
    date: '2026-01-28',
    location: 'Clínica Saúde',
  },
  {
    id: '5',
    amount: 89.90,
    category: 'lazer',
    description: 'Cinema e pipoca',
    date: '2026-01-27',
    location: 'Cinemark',
  },
  {
    id: '6',
    amount: 450.00,
    category: 'moradia',
    description: 'Condomínio',
    date: '2026-01-25',
  },
  {
    id: '7',
    amount: 199.00,
    category: 'educacao',
    description: 'Curso online',
    date: '2026-01-24',
    location: 'Udemy',
  },
  {
    id: '8',
    amount: 79.90,
    category: 'vestuario',
    description: 'Camiseta',
    date: '2026-01-22',
    location: 'Renner',
  },
];

export const dashboardData: DashboardData = {
  currentMonth: {
    month: 'Janeiro',
    year: 2026,
    total: 2450.00,
    byCategory: {
      alimentacao: 890.00,
      transporte: 420.00,
      moradia: 650.00,
      saude: 120.00,
      educacao: 199.00,
      lazer: 89.90,
      mercado: 50.00,
      vestuario: 79.90,
      servicos: 0,
      outros: 0,
    },
    expenses: mockExpenses,
  },
  previousMonth: {
    month: 'Dezembro',
    year: 2025,
    total: 3200.00,
    byCategory: {
      alimentacao: 1100.00,
      transporte: 500.00,
      moradia: 650.00,
      saude: 200.00,
      educacao: 0,
      lazer: 300.00,
      mercado: 350.00,
      vestuario: 0,
      servicos: 100.00,
      outros: 0,
    },
    expenses: [],
  },
  recentExpenses: mockExpenses.slice(0, 5),
};

export const getCategoryById = (id: string) => {
  return categories.find(cat => cat.id === id) || categories[categories.length - 1];
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
};
