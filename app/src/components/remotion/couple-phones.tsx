"use client";

import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
} from "remotion";

interface ChatBubbleProps {
  text: string;
  sender: "user-a" | "user-b" | "bot";
  label?: string;
  enterFrame: number;
}

function ChatBubble({ text, sender, label, enterFrame }: ChatBubbleProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - enterFrame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [16, 0]);

  if (frame < enterFrame) return null;

  const bgColor =
    sender === "user-a"
      ? "#DCF8C6"
      : sender === "user-b"
        ? "#D1E7FF"
        : "#FFFFFF";
  const align = sender === "bot" ? "flex-start" : "flex-end";
  const labelColor = sender === "user-a" ? "#0D4F9E" : "#3A8E8B";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: align,
        opacity,
        transform: `translateY(${translateY}px)`,
        marginBottom: 8,
      }}
    >
      {label && (
        <span style={{ fontSize: 9, fontWeight: 600, color: labelColor, marginBottom: 2 }}>
          {label}
        </span>
      )}
      <div
        style={{
          background: bgColor,
          padding: "8px 12px",
          borderRadius: 14,
          maxWidth: "80%",
          fontSize: 12,
          lineHeight: 1.4,
          whiteSpace: "pre-line",
          boxShadow: sender === "bot" ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
          border: sender === "bot" ? "1px solid #DFE3EA" : "none",
          color: "#1C2536",
        }}
      >
        {text}
      </div>
    </div>
  );
}

const messages: ChatBubbleProps[] = [
  { text: "Gastei 85 reais no mercado", sender: "user-a", label: "Voce", enterFrame: 15 },
  { text: "\u2705 Registrado!\n\n\u{1F6D2} Mercado\n\u{1F4B0} R$ 85,00\n\u{1F4C5} 31/01/2026", sender: "bot", enterFrame: 45 },
  { text: "Almocei fora, 42 reais", sender: "user-b", label: "Parceiro(a)", enterFrame: 80 },
  { text: "\u2705 Registrado!\n\n\u{1F354} Alimentacao\n\u{1F4B0} R$ 42,00\n\u{1F4C5} 31/01/2026", sender: "bot", enterFrame: 110 },
  { text: "quanto a gente gastou esse mes?", sender: "user-a", label: "Voce", enterFrame: 150 },
  { text: "\u{1F4CA} Resumo do Casal - Jan/2026\n\nTotal: R$ 3.280,00\n\u{1F464} Voce: R$ 1.850,00\n\u{1F464} Parceiro(a): R$ 1.430,00", sender: "bot", enterFrame: 180 },
];

export function CouplePhones() {
  return (
    <AbsoluteFill
      style={{
        background: "#E5DDD5",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      {messages.map((msg, i) => (
        <ChatBubble key={i} {...msg} />
      ))}
    </AbsoluteFill>
  );
}

// Remotion composition config
export const couplePhonesMeta = {
  id: "CouplePhones",
  component: CouplePhones,
  durationInFrames: 270,
  fps: 30,
  width: 300,
  height: 500,
};
