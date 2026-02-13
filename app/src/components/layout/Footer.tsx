import Link from "next/link";
import { MessageCircle, Mail, Github, Twitter } from "lucide-react";

const footerLinks = {
  produto: [
    { label: "Como Funciona", href: "/#como-funciona" },
    { label: "Precos", href: "/precos" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  legal: [
    { label: "Politica de Privacidade", href: "/privacidade" },
    { label: "Revogar Consentimento", href: "/revogar" },
    { label: "Termos de Uso", href: "#" },
  ],
  suporte: [
    { label: "FAQ", href: "/precos#faq" },
    { label: "Contato", href: "#" },
    { label: "Status", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gastei-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gastei-gradient flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Gastei</span>
            </Link>
            <p className="text-gastei-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Organizem as financas juntos pelo WhatsApp. Cada um manda mensagem — a IA organiza tudo.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gastei-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gastei-blue transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gastei-blue transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gastei-gray-400">
              Produto
            </h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gastei-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gastei-gray-400">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gastei-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gastei-gray-400">
              Suporte
            </h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gastei-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gastei-gray-400">
            &copy; {new Date().getFullYear()} Gastei. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gastei-gray-500">
            Feito com &#x1F499; no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
