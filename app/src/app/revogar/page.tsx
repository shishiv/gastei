import Link from "next/link";

export default function RevogarPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Revogar Consentimento
        </h1>
        <p className="text-muted-foreground mb-8">
          Esta pagina sera atualizada com o formulario de revogacao de consentimento em breve.
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
