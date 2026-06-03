import GlobeStatsSection from "@/components/GlobeStatsSection";
import HeroSection from "@/components/HeroSection";
import FeaturedJob from "@/components/FeaturedJob";
import HowItWorksSection from "@/components/HowItWorksSection";
import Image from "next/image";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <GlobeStatsSection/>
      <FeaturedJob/>
      <HowItWorksSection/>
      <PricingSection/>
      <CTASection/>
    </>
  );
}
