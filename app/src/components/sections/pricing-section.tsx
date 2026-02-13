import { plans } from "@/data/plans";
import { PricingSectionClient } from "./pricing-section-client";

export function PricingSection() {
  return <PricingSectionClient plans={plans} />;
}
