import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Phone, 
  ShieldAlert,
  Trash2,
  Lock,
  Clock
} from 'lucide-react';

export function Revogar() {
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !confirmed) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16 bg-gastei-gray-50">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Revogar Consentimento
            </h1>
            <p className="text-muted-foreground mt-2">
              Exercício de direito LGPD (Art. 18, IX)
            </p>
          </div>

          {!isSubmitted ? (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Warning Banner */}
              <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-orange-800 mb-1">
                      Atenção: Ação irreversível
                    </h3>
                    <p className="text-sm text-orange-700">
                      A revogação do consentimento irá encerrar permanentemente sua 
                      conta no Gastei. Esta ação não pode ser desfeita.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {/* Consequences */}
                <div className="mb-8">
                  <h3 className="font-medium text-foreground mb-4">
                    O que acontece ao revogar:
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: XCircle, text: 'Você não poderá mais registrar gastos' },
                      { icon: Lock, text: 'Perderá acesso a relatórios e histórico' },
                      { icon: Trash2, text: 'Seus dados serão excluídos em 30 dias' },
                      { icon: Clock, text: 'Ação é irreversível' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3 text-muted-foreground">
                        <item.icon className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <span className="text-sm">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="phone" 
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Telefone WhatsApp
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(formatPhone(e.target.value))}
                        className="pl-10 h-12"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Digite o número vinculado à sua conta Gastei
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="confirm"
                      checked={confirmed}
                      onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                      className="mt-1"
                    />
                    <label 
                      htmlFor="confirm" 
                      className="text-sm text-muted-foreground cursor-pointer"
                    >
                      Confirmo que desejo revogar meu consentimento e entendo 
                      que esta ação encerrará minha conta permanentemente.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={!phone || !confirmed || isLoading}
                    className="w-full h-12 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle 
                            className="opacity-25" 
                            cx="12" cy="12" r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                            fill="none"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      'Solicitar Revogação'
                    )}
                  </Button>
                </form>

                {/* Links */}
                <div className="mt-6 pt-6 border-t border-border text-center">
                  <p className="text-sm text-muted-foreground">
                    Antes de revogar, você pode conferir nossa{' '}
                    <a 
                      href="/privacidade" 
                      className="text-gastei-green hover:underline"
                    >
                      Política de Privacidade
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Solicitação Recebida
              </h2>
              
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6 text-left">
                <p className="text-green-800 mb-2">
                  <strong>Protocolo:</strong> #REV-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p className="text-green-700 text-sm">
                  Enviamos uma confirmação para o número {phone}. 
                  Sua conta será encerrada em até 30 dias.
                </p>
              </div>

              <div className="space-y-4 text-left">
                <h3 className="font-medium text-foreground">Próximos passos:</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>Você receberá um código de confirmação no WhatsApp</li>
                  <li>Confirme a revogação respondendo com o código</li>
                  <li>Seus dados serão excluídos em até 30 dias</li>
                  <li>Você receberá um email de confirmação da exclusão</li>
                </ol>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Mudou de ideia? Entre em contato em até 7 dias.
                </p>
                <a
                  href="mailto:suporte@gastei.app"
                  className="text-gastei-green font-medium hover:underline"
                >
                  Falar com o suporte
                </a>
              </div>
            </div>
          )}

          {/* LGPD Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Esta página atende aos requisitos da{' '}
              <a 
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gastei-green hover:underline"
              >
                Lei Geral de Proteção de Dados (LGPD)
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
