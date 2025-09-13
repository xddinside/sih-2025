import React from "react";
import LogoIcon from "~/components/icons/LogoIcon";
import HeroSection from "~/components/HeroSection";
import FeaturesSection from "~/components/FeaturesSection";
import StatsSection from "~/components/StatsSection";

// Main Page Component
export default function LandingPage() {
  return (
    <div className="overflow-x-hidden bg-[#0B0E13] font-sans text-white">
      <header className="container mx-auto flex max-w-7xl items-center justify-between border-b border-gray-800 px-8 py-8 lg:px-24">
        <div className="flex items-center">
          <LogoIcon />
        </div>
        <nav className="hidden items-center space-x-10 md:flex">
          <a
            href="/about"
            className="group text-gray-400 transition duration-300 hover:text-white"
          >
            About
            <span className="block h-0.5 max-w-0 bg-sky-500 transition-all duration-100 group-hover:max-w-full"></span>
          </a>
          <a
            href="/features"
            className="group text-gray-400 transition duration-300 hover:text-white"
          >
            Features
            <span className="block h-0.5 max-w-0 bg-sky-500 transition-all duration-100 group-hover:max-w-full"></span>
          </a>
          <a
            href="/contact"
            className="group text-gray-400 transition duration-300 hover:text-white"
          >
            Contact
            <span className="block h-0.5 max-w-0 bg-sky-500 transition-all duration-100 group-hover:max-w-full"></span>
          </a>
        </nav>
      </header>

      <main className="pt-20 pb-32">
        <HeroSection />

        <div className="container mx-auto max-w-7xl px-8 lg:px-24">
          <FeaturesSection />
          <StatsSection />
        </div>
      </main>
    </div>
  );
}
