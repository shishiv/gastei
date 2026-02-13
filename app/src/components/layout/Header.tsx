"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#como-funciona", label: "Para Casais" },
  { href: "/precos", label: "Precos" },
  { href: "/dashboard", label: "Dashboard" },
];

interface HeaderProps {
  onWaitlistOpen: () => void;
}

export function Header({ onWaitlistOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gastei-gradient flex items-center justify-center shadow-gastei group-hover:shadow-gastei-lg transition-shadow">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Gastei</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={onWaitlistOpen}
              className="bg-gastei-blue hover:bg-gastei-blue-dark text-white rounded-full px-6 shadow-gastei hover:shadow-gastei-lg transition-all"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Comecar Gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border animate-slide-up">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onWaitlistOpen();
              }}
              className="mt-4 bg-gastei-blue hover:bg-gastei-blue-dark text-white rounded-full w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Comecar Gratis
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
