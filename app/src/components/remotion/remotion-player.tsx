"use client";

import { lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageCircle, Send, Camera, Mic } from "lucide-react";

const Player = lazy(() =>
  import("@remotion/player").then((mod) => ({ default: mod.Player }))
);

const CouplePhones = lazy(() =>
  import("./couple-phones").then((mod) => ({ default: mod.CouplePhones }))
);

function PhoneSkeleton() {
  return (
    <div className="bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden min-h-[500px] flex items-center justify-center">
      <div className="text-center text-gastei-gray-400">
        <MessageCircle className="w-10 h-10 mx-auto mb-2 animate-pulse-slow" />
        <p className="text-sm">Carregando...</p>
      </div>
    </div>
  );
}

function StaticPhoneFallback() {
  return (
    <div className="bg-[#E5DDD5] rounded-[2.5rem] overflow-hidden min-h-[500px]">
      {/* WhatsApp Header */}
      <div className="bg-gastei-teal-dark px-4 pt-10 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gastei-blue flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Gastei</h3>
            <p className="text-white/70 text-xs">online</p>
          </div>
        </div>
      </div>

      {/* Static chat messages */}
      <div className="p-4 space-y-3">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-medium text-gastei-blue-dark mb-0.5">Voce</span>
          <div className="bg-[#DCF8C6] p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm">
            Gastei 85 reais no mercado
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="bg-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-sm whitespace-pre-line">
            {"\u2705 Registrado!\n\n\u{1F6D2} Mercado\n\u{1F4B0} R$ 85,00\n\u{1F4C5} 31/01/2026"}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-medium text-gastei-teal-dark mb-0.5">Parceiro(a)</span>
          <div className="bg-[#D1E7FF] p-3 rounded-2xl rounded-tr-sm max-w-[85%] text-sm">
            Almocei fora, 42 reais
          </div>
        </div>
        <div className="flex flex-col items-start">
          <div className="bg-white p-3 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-sm whitespace-pre-line">
            {"\u{1F4CA} Resumo do Casal - Jan/2026\n\nTotal: R$ 3.280,00\n\u{1F464} Voce: R$ 1.850,00\n\u{1F464} Parceiro(a): R$ 1.430,00"}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#F0F0F0] p-3 flex items-center gap-2">
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
          <Camera className="w-5 h-5" />
        </button>
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
          Digite uma mensagem
        </div>
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600">
          <Mic className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 rounded-full bg-gastei-teal flex items-center justify-center text-white">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function RemotionPlayer() {
  const isMobile = useIsMobile();

  // On mobile, show static fallback to save CPU and bundle size
  if (isMobile) {
    return <StaticPhoneFallback />;
  }

  return (
    <Suspense fallback={<PhoneSkeleton />}>
      <div className="rounded-[2.5rem] overflow-hidden">
        <Player
          component={CouplePhones}
          durationInFrames={270}
          compositionWidth={300}
          compositionHeight={500}
          fps={30}
          autoPlay
          loop
          style={{ width: "100%", height: "100%" }}
          controls={false}
          acknowledgeRemotionLicense
        />
      </div>
    </Suspense>
  );
}
