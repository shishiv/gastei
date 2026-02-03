import { MessageSquare, Camera, Mic, Sparkles, BarChart3, Bell } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Manda mensagem',
    description: 'Texto, foto ou áudio. Do jeito que você preferir, no seu WhatsApp.',
    color: 'green',
  },
  {
    icon: Sparkles,
    title: 'IA extrai dados',
    description: 'Nossa inteligência artificial identifica valor, categoria e local automaticamente.',
    color: 'blue',
  },
  {
    icon: BarChart3,
    title: 'Acompanhe tudo',
    description: 'Consulte seus gastos quando quiser, direto no WhatsApp ou no dashboard.',
    color: 'purple',
  },
];

const features = [
  {
    icon: Camera,
    title: 'OCR Inteligente',
    description: 'Tire foto do comprovante e a IA extrai todos os dados automaticamente.',
  },
  {
    icon: Mic,
    title: 'Reconhecimento de Voz',
    description: 'Fale naturalmente, como "gastei 30 reais no Uber". A IA entende tudo.',
  },
  {
    icon: Bell,
    title: 'Lembretes',
    description: 'Receba alertas de gastos recorrentes e nunca esqueça de registrar.',
  },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como funciona o{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gastei-green to-gastei-teal">
              Gastei
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Três passos simples para controlar seus gastos sem complicação
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative text-center group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gastei-green/30 to-transparent" />
              )}

              {/* Icon */}
              <div
                className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-gastei group-hover:shadow-gastei-lg transition-all group-hover:-translate-y-1 ${
                  step.color === 'green'
                    ? 'from-gastei-green/20 to-gastei-green/5'
                    : step.color === 'blue'
                    ? 'from-blue-500/20 to-blue-500/5'
                    : 'from-purple-500/20 to-purple-500/5'
                }`}
              >
                <step.icon
                  className={`w-10 h-10 ${
                    step.color === 'green'
                      ? 'text-gastei-green'
                      : step.color === 'blue'
                      ? 'text-blue-500'
                      : 'text-purple-500'
                  }`}
                />
              </div>

              {/* Step Number */}
              <div className="absolute top-0 right-1/3 w-8 h-8 rounded-full bg-gastei-green text-white text-sm font-bold flex items-center justify-center">
                {index + 1}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-gastei-gray-50 hover:bg-white hover:shadow-gastei border border-transparent hover:border-border/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gastei-green/10 flex items-center justify-center mb-4 group-hover:bg-gastei-green group-hover:text-white transition-colors">
                <feature.icon className="w-6 h-6 text-gastei-green group-hover:text-white" />
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
