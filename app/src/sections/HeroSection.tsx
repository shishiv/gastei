import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Camera, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';

const chatMessages = [
  {
    type: 'user',
    content: 'Gastei 50 reais no mercado',
    delay: 1000,
  },
  {
    type: 'bot',
    content: '✅ Registrado!\n\n🛒 Mercado\n💰 R$ 50,00\n📅 31/01/2026',
    delay: 2500,
  },
  {
    type: 'user',
    content: 'quanto gastei esse mês?',
    delay: 4500,
  },
  {
    type: 'bot',
    content: '📊 Resumo de Janeiro/2026\n\nTotal: R$ 2.450,00\n\n🍔 Alimentação: R$ 890,00\n🚗 Transporte: R$ 420,00\n🏠 Moradia: R$ 650,00',
    delay: 6000,
  },
];

export function HeroSection() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, index]);
      }, msg.delay);
    });
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [visibleMessages]);

  return (
    <section className="relative min-h-screen pt-20 md:pt-24 pb-16 overflow-hidden bg-gradient-to-b from-gastei-green-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gastei-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gastei-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-gastei-green/10 text-gastei-green-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gastei-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gastei-green"></span>
              </span>
              Novo: Reconhecimento de voz
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Controle seus gastos pelo{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gastei-green to-gastei-teal">
                WhatsApp
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Zero fricção, máxima praticidade. Manda uma foto, áudio ou texto e 
              nossa IA faz o resto. Sem apps, sem login, sem complicação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-gastei-green hover:bg-gastei-green-dark text-white rounded-full px-8 shadow-gastei hover:shadow-gastei-lg transition-all text-base"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Começar Grátis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-2 hover:bg-gastei-green-50 transition-all text-base"
              >
                Ver Demonstração
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">50K+</p>
                <p className="text-sm text-muted-foreground">Usuários</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">2M+</p>
                <p className="text-sm text-muted-foreground">Gastos registrados</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-foreground">4.9</p>
                <p className="text-sm text-muted-foreground">Avaliação</p>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
                
                <div className="bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden min-h-[600px]">
                  {/* WhatsApp Header */}
                  <div className="bg-gastei-teal-dark px-4 pt-10 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gastei-green flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">Gastei</h3>
                        <p className="text-white/70 text-xs">online</p>
                      </div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="p-4 space-y-3 min-h-[450px] max-h-[450px] overflow-hidden">
                    {chatMessages.map((msg, index) => (
                      visibleMessages.includes(index) && (
                        <div
                          key={index}
                          className={`animate-slide-in-right ${
                            msg.type === 'user'
                              ? 'ml-auto bg-[#DCF8C6] rounded-2xl rounded-tr-sm'
                              : 'mr-auto bg-white rounded-2xl rounded-tl-sm shadow-sm'
                          } p-3 max-w-[85%] whitespace-pre-line text-sm`}
                        >
                          {msg.content}
                        </div>
                      )
                    ))}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="bg-[#F0F0F0] p-3 flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-600">
                      <Camera className="w-5 h-5" />
                    </button>
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
                      Digite uma mensagem
                    </div>
                    <button className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center text-gray-600">
                      <Mic className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-gastei-teal flex items-center justify-center text-white">
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-gastei-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xl">🍔</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alimentação</p>
                    <p className="text-xs text-green-600">R$ 890,00</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-gastei-lg p-4 animate-float"
                style={{ animationDelay: '1s' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl">🚗</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Transporte</p>
                    <p className="text-xs text-blue-600">R$ 420,00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
