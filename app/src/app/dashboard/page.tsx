import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 rounded-2xl bg-gastei-gradient flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Em breve</h1>
        <p className="text-muted-foreground mb-8">
          O dashboard compartilhado esta sendo construido. Entre na lista de
          espera para ser avisado quando estiver pronto.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gastei-blue text-white px-6 py-3 font-medium hover:bg-gastei-blue-dark transition-colors"
        >
          Voltar ao inicio
        </Link>
      </div>
    </div>
  );
}
