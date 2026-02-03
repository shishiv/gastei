import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/sections/HeroSection';
import { HowItWorksSection } from '@/sections/HowItWorksSection';
import { PricingSection } from '@/sections/PricingSection';
import { CTASection } from '@/sections/CTASection';

export function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
