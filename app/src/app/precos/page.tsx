"use client";

import { useState } from "react";
import { Check, HelpCircle } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PlanCard } from "@/components/cards/plan-card";
import { WaitlistDialog } from "@/components/waitlist/waitlist-dialog";
import { plans } from "@/data/plans";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Posso mudar de plano a qualquer momento?",
    answer:
      "Sim! Voce pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudancas entram em vigor no proximo ciclo de faturamento.",
  },
  {
    question: "O que acontece se eu ultrapassar o limite do meu plano?",
    answer:
      "No plano Gratis, voce recebera um aviso quando atingir 80% do limite. Se ultrapassar, precisara esperar o proximo mes ou fazer upgrade. Nos planos pagos, nao ha limites.",
  },
  {
    question: "Como funciona o periodo de teste?",
    answer:
      "Todos os planos pagos tem 7 dias de garantia. Se nao estiver satisfeito, devolvemos 100% do seu dinheiro, sem perguntas.",
  },
  {
    question: "Posso cancelar a assinatura?",
    answer:
      "Sim, voce pode cancelar a qualquer momento. Seu acesso continua ate o final do periodo pago. Nao ha multa de cancelamento.",
  },
  {
    question: "O plano Familiar permite quantos membros?",
    answer:
      "O plano Familiar inclui o titular mais ate 4 membros adicionais (total de 5). Cada membro adicional custa R$ 5,90/mes.",
  },
  {
    question: "Como funciona para casais?",
    answer:
      "Cada parceiro(a) adiciona o Gastei no seu proprio WhatsApp. Os gastos sao consolidados automaticamente. Os dois acessam o dashboard compartilhado.",
  },
  {
    question: "Meu parceiro(a) vai ver todos os meus gastos?",
    answer:
      "Sim, todos os gastos sao compartilhados no plano Duo. Transparencia total para o casal.",
  },
  {
    question: "Qual a diferenca entre o Duo e o Familiar?",
    answer:
      "O Duo e para 2 pessoas (casais). O Familiar suporta ate 5 membros (pais + filhos, colegas de apartamento, etc).",
  },
];

const comparisonRows = [
  { feature: "Gastos por mes", free: "30", duo: "Ilimitado", familiar: "Ilimitado" },
  { feature: "Membros", free: "1", duo: "2", familiar: "Ate 5" },
  { feature: "Categorizacao automatica", free: true, duo: true, familiar: true },
  { feature: "Resumo no WhatsApp", free: true, duo: true, familiar: true },
  { feature: "Dashboard compartilhado", free: false, duo: true, familiar: true },
  { feature: "Exportacao CSV", free: false, duo: true, familiar: true },
  { feature: "Exportacao PDF", free: false, duo: false, familiar: true },
  { feature: "Suporte prioritario", free: false, duo: true, familiar: true },
];

export default function PrecosPage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onWaitlistOpen={openWaitlist} />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gastei-hero">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Planos e{" "}
              <span className="text-gastei-gradient">Precos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Para voce, para o casal, ou para toda a familia. Comece gratis e
              evolua conforme precisar.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onWaitlistOpen={openWaitlist}
                />
              ))}
            </div>

            {/* Compare Features */}
            <ScrollReveal className="mt-20">
              <h2 className="text-2xl font-bold text-center mb-12">
                Compare os recursos
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-4 px-4 font-semibold">
                        Recurso
                      </th>
                      <th className="text-center py-4 px-4 font-semibold">
                        Gratis
                      </th>
                      <th className="text-center py-4 px-4 font-semibold text-gastei-blue">
                        Duo
                      </th>
                      <th className="text-center py-4 px-4 font-semibold">
                        Familiar
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row, index) => (
                      <tr key={index} className="border-b border-border/50">
                        <td className="py-4 px-4 text-muted-foreground">
                          {row.feature}
                        </td>
                        <td className="text-center py-4 px-4">
                          {typeof row.free === "boolean" ? (
                            row.free ? (
                              <Check className="w-5 h-5 text-gastei-blue mx-auto" />
                            ) : (
                              <span className="text-gray-300">&mdash;</span>
                            )
                          ) : (
                            row.free
                          )}
                        </td>
                        <td className="text-center py-4 px-4 bg-gastei-blue/5">
                          {typeof row.duo === "boolean" ? (
                            row.duo ? (
                              <Check className="w-5 h-5 text-gastei-blue mx-auto" />
                            ) : (
                              <span className="text-gray-300">&mdash;</span>
                            )
                          ) : (
                            <span className="font-medium text-gastei-blue">
                              {row.duo}
                            </span>
                          )}
                        </td>
                        <td className="text-center py-4 px-4">
                          {typeof row.familiar === "boolean" ? (
                            row.familiar ? (
                              <Check className="w-5 h-5 text-gastei-blue mx-auto" />
                            ) : (
                              <span className="text-gray-300">&mdash;</span>
                            )
                          ) : (
                            row.familiar
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-16 bg-gastei-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal className="text-center mb-12">
              <HelpCircle className="w-12 h-12 text-gastei-blue mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Perguntas Frequentes</h2>
            </ScrollReveal>

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
      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </div>
  );
}
