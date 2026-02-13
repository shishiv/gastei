"use client";

import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RemotionPlayer } from "@/components/remotion/remotion-player";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/motion-wrapper";

interface HeroSectionProps {
  onWaitlistOpen: () => void;
}

export function HeroSection({ onWaitlistOpen }: HeroSectionProps) {
  const handleScrollToComo = () => {
    document
      .getElementById("como-funciona")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen pt-20 md:pt-24 pb-16 overflow-hidden bg-gastei-hero">
      {/* Background blobs with seeded positions (no Math.random) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gastei-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gastei-teal/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gastei-accent/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <StaggerContainer className="text-center lg:text-left">
            <StaggerItem>
              <div className="inline-flex items-center gap-2 bg-gastei-blue/10 text-gastei-blue-dark px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gastei-blue opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gastei-blue" />
                </span>
                Novo: Plano Duo para casais
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Organizem as financas{" "}
                <span className="text-gastei-gradient">juntos</span> pelo
                WhatsApp
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Voce e seu parceiro(a) mandam mensagem, audio ou foto — e a IA
                organiza tudo. Cada um no seu WhatsApp, tudo num lugar so. Sem
                apps, sem login, sem complicacao.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={onWaitlistOpen}
                  className="bg-gastei-blue hover:bg-gastei-blue-dark text-white rounded-full px-8 shadow-gastei hover:shadow-gastei-lg transition-all text-base"
                >
                  Comecar Gratis
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-8 border-2 hover:bg-gastei-blue-light transition-all text-base"
                  onClick={handleScrollToComo}
                >
                  Como funciona a dois
                </Button>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-3">
                <span className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm text-muted-foreground shadow-sm">
                  <span>&#x270F;&#xFE0F;&#x1F3A4;&#x1F4F8;</span> 3 formas de registrar
                </span>
                <span className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm text-muted-foreground shadow-sm">
                  Zero apps para instalar
                </span>
                <span className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm text-muted-foreground shadow-sm">
                  Dashboard compartilhado
                </span>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Right Content - Phone Mockup */}
          <FadeInUp delay={0.3} className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              {/* Phone Frame */}
              <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-10" />
                <RemotionPlayer />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-gastei-lg p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl">&#x1F6D2;</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mercado</p>
                    <p className="text-xs text-gastei-blue">R$ 85,00</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-gastei-lg p-4 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-gastei-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Gastos do Casal</p>
                    <p className="text-xs text-gastei-blue">R$ 3.280,00</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
