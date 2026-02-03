import { PlanCard } from '@/components/cards/PlanCard';
import { plans } from '@/data/mock';

export function PricingSection() {
  return (
    <section className="py-20 md:py-32 bg-gastei-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Escolha seu{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gastei-green to-gastei-teal">
              plano
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Comece grátis e upgrade quando precisar. Sem compromisso, cancele quando quiser.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gastei-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>7 dias de garantia</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gastei-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Cancele quando quiser</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-gastei-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Pagamento seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
