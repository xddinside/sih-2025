import React from "react";

const HeroSection: React.FC = React.memo(() => {
  return (
    <section className="relative">
      <div className="container mx-auto max-w-7xl px-8 lg:px-24">
        <div className="text-center lg:w-[55%] lg:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Redefining Attendance for the Digital Classroom
          </h1>
          <p className="mt-8 text-lg text-gray-300">
            Automated, reliable, and data-driven attendance monitoring for
            modern colleges.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4 lg:justify-start">
            <button className="rounded-lg bg-sky-500 px-8 py-3 font-semibold transition-all duration-200 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30">
              Get Started
            </button>
            <button className="rounded-lg border border-gray-600 bg-transparent px-8 py-3 font-semibold transition-all duration-200 hover:border-gray-500 hover:bg-gray-800/20">
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Mockup */}
      <div className="absolute top-1/2 right-0 -mr-16 hidden w-[45%] -translate-y-1/2 lg:block">
        <div className="rounded-2xl border border-gray-700/50 bg-[#1C1E2A]/60 p-6 shadow-2xl shadow-sky-500/10 backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-xl font-bold">Dashboard</h3>
          </div>
          <div className="rounded-lg bg-[#11131E] p-4">
            <p className="mb-2 text-sm text-gray-400">Attendance</p>
            {/* Simplified graph representation */}
            <div className="relative h-40 w-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
              >
                <path
                  d="M 0 70 L 60 25 L 120 65 L 180 55 L 240 85 L 300 45"
                  stroke="#0EA5E9"
                  fill="none"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <div className="mt-2 flex justify-between px-2 text-xs text-gray-500">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-[#11131E] p-4">
              <p className="text-sm text-gray-400">Total Attendance</p>
              <p className="mt-1 text-2xl font-bold">1,245</p>
            </div>
            <div className="rounded-lg bg-[#11131E] p-4">
              <p className="text-sm text-gray-400">Attendance %</p>
              <p className="mt-1 text-2xl font-bold">75%</p>
            </div>
            <div className="rounded-lg bg-[#11131E] p-4">
              <p className="text-sm text-gray-400">Performance</p>
              <p className="mt-1 text-2xl font-bold">320</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
