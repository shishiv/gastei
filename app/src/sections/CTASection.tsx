import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gastei-green to-gastei-teal" />
      
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Pronto para controlar seus gastos?
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Junte-se a mais de 50 mil pessoas que já simplificaram sua vida financeira 
          com o Gastei. Comece grátis hoje mesmo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-gastei-green hover:bg-white/90 rounded-full px-8 shadow-lg hover:shadow-xl transition-all text-base font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Começar Grátis
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white/10 rounded-full px-8 transition-all text-base"
          >
            Falar com Suporte
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Testimonial */}
        <div className="mt-16 inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
          <div className="flex -space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gastei-green-100 to-gastei-green-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gastei-green-dark"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="text-white/80 text-sm">4.9 de 5.0 (2.3k avaliações)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
