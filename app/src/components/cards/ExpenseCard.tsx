import type { Expense } from '@/types';
import { getCategoryById, formatCurrency, formatDate } from '@/data/mock';

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const category = getCategoryById(expense.category);

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-sm transition-all">
      {/* Category Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${category.color}15` }}
      >
        {category.emoji}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-foreground truncate">
            {expense.description}
          </h4>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{category.name}</span>
          {expense.location && (
            <>
              <span>•</span>
              <span className="truncate">{expense.location}</span>
            </>
          )}
        </div>
      </div>

      {/* Amount & Date */}
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-foreground">
          {formatCurrency(expense.amount)}
        </p>
        <p className="text-xs text-muted-foreground">
          {formatDate(expense.date)}
        </p>
      </div>
    </div>
  );
}
