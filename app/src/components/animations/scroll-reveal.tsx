"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

const directionMap: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function ScrollReveal({
  children,
  direction = "up",
  distance = 40,
  duration = 0.7,
  delay = 0,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const d = directionMap[direction];
    // Simplified animation on mobile: fade only, no translate
    const fromVars = isMobile
      ? { opacity: 0 }
      : { opacity: 0, x: d.x * distance, y: d.y * distance };
    const toVars = isMobile
      ? { opacity: 1, duration, delay }
      : { opacity: 1, x: 0, y: 0, duration, delay };

    gsap.set(el, fromVars);

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, { ...toVars, ease: "power2.out" });
      },
    });

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill());
    };
  }, [direction, distance, duration, delay, isMobile]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
