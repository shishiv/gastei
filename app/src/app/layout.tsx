import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gastei - Organizem as financas juntos pelo WhatsApp",
  description:
    "Voce e seu parceiro(a) mandam mensagem, audio ou foto — e a IA organiza tudo. Sem apps, sem login, sem complicacao.",
  openGraph: {
    title: "Gastei - Organizem as financas juntos pelo WhatsApp",
    description:
      "Controle de gastos para casais e familias via WhatsApp com inteligencia artificial.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
