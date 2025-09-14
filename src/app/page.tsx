import React from "react";
import HeroSection from "~/components/HeroSection";
import FeaturesSection from "~/components/FeaturesSection";
import StatsSection from "~/components/StatsSection";

// Main Page Component
export default function LandingPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <main className="min-h-[calc(100vh-4rem)] pt-20 pb-32">
        <HeroSection />

        <div className="container mx-auto max-w-7xl px-8 lg:px-24">
          <FeaturesSection />
          <StatsSection />
        </div>
      </main>
    </div>
  );
}
