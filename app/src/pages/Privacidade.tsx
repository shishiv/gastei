import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock, Eye, Trash2, FileText, UserX } from 'lucide-react';

const sections = [
  {
    id: 'coleta',
    icon: Eye,
    title: '1. Dados Coletados',
    content: [
      'Número de telefone vinculado ao WhatsApp',
      'Registros de gastos (valor, categoria, data, descrição)',
      'Dados de uso e interação com o sistema',
      'Imagens de comprovantes e notas fiscais (quando enviadas)',
      'Mensagens de áudio (processadas e convertidas em texto)',
    ],
  },
  {
    id: 'finalidade',
    icon: FileText,
    title: '2. Finalidade do Tratamento',
    content: [
      'Fornecer o serviço de controle de gastos',
      'Categorizar automaticamente suas despesas',
      'Gerar relatórios e resumos financeiros',
      'Melhorar a precisão do reconhecimento de dados',
      'Enviar notificações e lembretes (quando solicitado)',
    ],
  },
  {
    id: 'base-legal',
    icon: Shield,
    title: '3. Base Legal',
    content: [
      'Execução de contrato ou de procedimentos preliminares (Art. 7º, V, LGPD)',
      'Consentimento do titular (Art. 7º, I, LGPD)',
      'Legítimo interesse para melhoria do serviço (Art. 7º, IX, LGPD)',
    ],
  },
  {
    id: 'compartilhamento',
    icon: Lock,
    title: '4. Compartilhamento de Dados',
    content: [
      'Não vendemos seus dados para terceiros',
      'Compartilhamos apenas com prestadores de serviço essenciais (Azure para OCR, OpenAI para processamento de linguagem)',
      'Todos os parceiros possuem contratos de confidencialidade',
      'Dados podem ser compartilhados em caso de obrigação legal',
    ],
  },
  {
    id: 'retencao',
    icon: Trash2,
    title: '5. Retenção de Dados',
    content: [
      'Dados mantidos enquanto você utilizar o serviço',
      'Após cancelamento, dados são excluídos em até 30 dias',
      'Backup mantido por até 90 dias para recuperação',
      'Dados anonimizados podem ser mantidos para estatísticas',
    ],
  },
  {
    id: 'direitos',
    icon: UserX,
    title: '6. Seus Direitos (Art. 18 LGPD)',
    content: [
      'Confirmar a existência de tratamento',
      'Acessar seus dados',
      'Corrigir dados incompletos ou desatualizados',
      'Anonimizar, bloquear ou eliminar dados desnecessários',
      'Portabilidade dos dados para outro serviço',
      'Eliminação dos dados tratados com consentimento',
      'Informação sobre compartilhamento',
      'Revogação do consentimento',
    ],
  },
];

export function Privacidade() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gastei-green/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-gastei-green" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Política de Privacidade
                </h1>
                <p className="text-sm text-muted-foreground">
                  Última atualização: 30/01/2026
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              O Gastei valoriza sua privacidade e está comprometido em proteger seus dados 
              pessoais. Esta política descreve como coletamos, usamos, armazenamos e 
              protegemos suas informações, em conformidade com a Lei Geral de Proteção 
              de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gastei-green/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-gastei-green" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3 ml-13">
                  {section.content.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gastei-green mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            {/* Revogação */}
            <section className="bg-gastei-green/5 rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                7. Revogação de Consentimento
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você pode revogar seu consentimento a qualquer momento. A revogação 
                resultará no encerramento da sua conta e exclusão dos seus dados em 
                até 30 dias.
              </p>
              <a
                href="/revogar"
                className="inline-flex items-center gap-2 text-gastei-green font-medium hover:underline"
              >
                Solicitar revogação de consentimento
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </section>

            {/* Contato */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                8. Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
                entre em contato conosco:
              </p>
              <div className="mt-4 space-y-2 text-muted-foreground">
                <p>Email: privacidade@gastei.app</p>
                <p>WhatsApp: +55 (11) 99999-9999</p>
                <p>Endereço: Av. Paulista, 1000 - São Paulo/SP</p>
              </div>
            </section>

            {/* ANPD */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                9. Encarregado de Dados (DPO)
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Nosso Encarregado de Dados (DPO) pode ser contatado para questões 
                relacionadas à proteção de dados pessoais. Você também tem o direito 
                de registrar reclamações junto à Autoridade Nacional de Proteção de 
                Dados (ANPD) através do site{' '}
                <a 
                  href="https://www.gov.br/anpd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gastei-green hover:underline"
                >
                  www.gov.br/anpd
                </a>.
              </p>
            </section>

            {/* Alterações */}
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                10. Alterações nesta Política
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos você 
                sobre alterações significativas através do WhatsApp ou email. O uso 
                continuado do serviço após as alterações constitui aceitação da nova 
                política.
              </p>
            </section>
          </div>

          {/* Back to top */}
          <div className="mt-16 pt-8 border-t border-border">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-gastei-green font-medium hover:underline flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              Voltar para o início
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
