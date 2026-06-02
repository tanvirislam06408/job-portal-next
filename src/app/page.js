import GlobeStatsSection from "@/components/GlobeStatsSection";
import HeroSection from "@/components/HeroSection";
import FeaturedJob from "@/components/FeaturedJob";
import Image from "next/image";
import PricingSection from "@/components/PricingSection";

export default function Home() {
  return (
    <>
      <HeroSection/>
      <GlobeStatsSection/>
      <FeaturedJob/>
      <PricingSection/>
    </>
  );
}
