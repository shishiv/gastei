import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PlanCard } from '@/components/cards/PlanCard';
import { plans } from '@/data/mock';
import { Check, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Posso mudar de plano a qualquer momento?',
    answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças entram em vigor no próximo ciclo de faturamento.',
  },
  {
    question: 'O que acontece se eu ultrapassar o limite do meu plano?',
    answer: 'No plano Free, você receberá um aviso quando atingir 80% do limite. Se ultrapassar, precisará esperar o próximo mês ou fazer upgrade. Nos planos pagos, não há limites.',
  },
  {
    question: 'Como funciona o período de teste?',
    answer: 'Todos os planos pagos têm 7 dias de garantia. Se não estiver satisfeito, devolvemos 100% do seu dinheiro, sem perguntas.',
  },
  {
    question: 'Posso cancelar a assinatura?',
    answer: 'Sim, você pode cancelar a qualquer momento. Seu acesso continua até o final do período pago. Não há multa de cancelamento.',
  },
  {
    question: 'O plano Familiar permite quantos membros?',
    answer: 'O plano Familiar inclui o titular mais até 4 membros adicionais (total de 5). Cada membro adicional custa R$ 5,90/mês.',
  },
];

export function Precos() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-b from-gastei-green-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Planos e{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gastei-green to-gastei-teal">
                Preços
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Escolha o plano que melhor se adapta às suas necessidades. 
              Comece grátis e evolua conforme cresce.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            {/* Compare Features */}
            <div className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-12">
                Compare os recursos
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-semibold">Recurso</th>
                      <th className="text-center py-4 px-4 font-semibold">Free</th>
                      <th className="text-center py-4 px-4 font-semibold text-gastei-green">Simples</th>
                      <th className="text-center py-4 px-4 font-semibold">Pro</th>
                      <th className="text-center py-4 px-4 font-semibold">Familiar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: 'Gastos por mês', free: '30', simples: '200', pro: 'Ilimitado', familiar: 'Ilimitado' },
                      { feature: 'Categorização automática', free: true, simples: true, pro: true, familiar: true },
                      { feature: 'Resumo no WhatsApp', free: true, simples: true, pro: true, familiar: true },
                      { feature: 'Exportação CSV', free: false, simples: true, pro: true, familiar: true },
                      { feature: 'Exportação PDF', free: false, simples: false, pro: true, familiar: true },
                      { feature: 'Dashboard completo', free: false, simples: false, pro: true, familiar: true },
                      { feature: 'Membros', free: '1', simples: '1', pro: '1', familiar: 'Até 5' },
                      { feature: 'Suporte prioritário', free: false, simples: true, pro: true, familiar: true },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-4 px-4 text-muted-foreground">{row.feature}</td>
                        <td className="text-center py-4 px-4">
                          {typeof row.free === 'boolean' ? (
                            row.free ? <Check className="w-5 h-5 text-gastei-green mx-auto" /> : <span className="text-gray-300">—</span>
                          ) : (
                            row.free
                          )}
                        </td>
                        <td className="text-center py-4 px-4 bg-gastei-green/5">
                          {typeof row.simples === 'boolean' ? (
                            row.simples ? <Check className="w-5 h-5 text-gastei-green mx-auto" /> : <span className="text-gray-300">—</span>
                          ) : (
                            <span className="font-medium text-gastei-green">{row.simples}</span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {typeof row.pro === 'boolean' ? (
                            row.pro ? <Check className="w-5 h-5 text-gastei-green mx-auto" /> : <span className="text-gray-300">—</span>
                          ) : (
                            row.pro
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {typeof row.familiar === 'boolean' ? (
                            row.familiar ? <Check className="w-5 h-5 text-gastei-green mx-auto" /> : <span className="text-gray-300">—</span>
                          ) : (
                            row.familiar
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 bg-gastei-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <HelpCircle className="w-12 h-12 text-gastei-green mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Perguntas Frequentes</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-xl px-6 border-none shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
