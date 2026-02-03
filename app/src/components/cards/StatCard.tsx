import type { ReactNode } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: ReactNode;
  color?: 'green' | 'blue' | 'purple' | 'orange';
}

export function StatCard({
  title,
  value,
  change,
  icon,
  color = 'green',
}: StatCardProps) {
  const colorClasses = {
    green: 'from-gastei-green/20 to-gastei-green/5 text-gastei-green',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-500',
    purple: 'from-purple-500/20 to-purple-500/5 text-purple-500',
    orange: 'from-orange-500/20 to-orange-500/5 text-orange-500',
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center`}
        >
          {icon}
        </div>
        {change !== undefined && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              change >= 0 ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {change >= 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}
