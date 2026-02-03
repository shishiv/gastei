import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StatCard } from '@/components/cards/StatCard';
import { ExpenseCard } from '@/components/cards/ExpenseCard';
import { dashboardData, formatCurrency, getCategoryById } from '@/data/mock';
import { 
  Wallet, 
  TrendingDown, 
  TrendingUp, 
  PieChart, 
  Calendar,
  Filter,
  Download,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';

const chartData = Object.entries(dashboardData.currentMonth.byCategory)
  .filter(([, value]) => value > 0)
  .map(([category, value]) => ({
    name: getCategoryById(category).name,
    value,
    color: getCategoryById(category).color,
  }));

const monthlyComparison = [
  { month: 'Out', current: 2800, previous: 2500 },
  { month: 'Nov', current: 2600, previous: 2700 },
  { month: 'Dez', current: 3200, previous: 2900 },
  { month: 'Jan', current: 2450, previous: 3200 },
];

export function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const totalChange = ((dashboardData.currentMonth.total - dashboardData.previousMonth.total) / dashboardData.previousMonth.total) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 bg-gastei-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Acompanhe seus gastos e mantenha o controle financeiro
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Calendar className="w-4 h-4" />
                Janeiro 2026
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar
              </Button>
              <Button className="bg-gastei-green hover:bg-gastei-green-dark gap-2">
                <Plus className="w-4 h-4" />
                Novo Gasto
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total do Mês"
              value={formatCurrency(dashboardData.currentMonth.total)}
              change={totalChange}
              icon={<Wallet className="w-6 h-6" />}
              color="green"
            />
            <StatCard
              title="Maior Gasto"
              value={formatCurrency(Math.max(...Object.values(dashboardData.currentMonth.byCategory)))}
              icon={<TrendingUp className="w-6 h-6" />}
              color="orange"
            />
            <StatCard
              title="Economia"
              value={formatCurrency(350)}
              change={-12}
              icon={<TrendingDown className="w-6 h-6" />}
              color="blue"
            />
            <StatCard
              title="Transações"
              value="24"
              icon={<PieChart className="w-6 h-6" />}
              color="purple"
            />
          </div>

          {/* Charts & Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Evolução Mensal</h2>
                <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <TabsList className="h-8">
                    <TabsTrigger value="week" className="text-xs">Semana</TabsTrigger>
                    <TabsTrigger value="month" className="text-xs">Mês</TabsTrigger>
                    <TabsTrigger value="year" className="text-xs">Ano</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyComparison}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tickFormatter={(value) => `R$${value}`}
                    />
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="current" fill="#25D366" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="previous" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Por Categoria</h2>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {chartData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium">{formatCurrency(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Gastos Recentes</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filtrar
                </Button>
                <Button variant="ghost" size="sm" className="text-gastei-green">
                  Ver todos
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              {dashboardData.recentExpenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
