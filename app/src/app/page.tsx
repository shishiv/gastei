"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LenisProvider } from "@/components/animations/lenis-provider";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PricingSectionClient } from "@/components/sections/pricing-section-client";
import { CTASection } from "@/components/sections/cta-section";
import { WaitlistDialog } from "@/components/waitlist/waitlist-dialog";
import { plans } from "@/data/plans";

export default function HomePage() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const openWaitlist = () => setWaitlistOpen(true);

  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col">
        <Header onWaitlistOpen={openWaitlist} />
        <main className="flex-1">
          <HeroSection onWaitlistOpen={openWaitlist} />
          <HowItWorksSection />
          <PricingSectionClient plans={plans} onWaitlistOpen={openWaitlist} />
          <CTASection onWaitlistOpen={openWaitlist} />
        </main>
        <Footer />
        <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      </div>
    </LenisProvider>
  );
}
