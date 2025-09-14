import React from "react";

const StatsSection: React.FC = React.memo(() => {
  return (
    <section className="mt-32 flex flex-col items-center justify-between gap-8 rounded-2xl border border-gray-800 bg-[#1C1E2A]/50 p-12 lg:flex-row lg:gap-16">
      <div className="grid w-full grid-cols-1 gap-10 text-center sm:grid-cols-3 lg:text-left">
        <div>
          <p className="text-4xl font-bold text-sky-400">95% Faster</p>
          <p className="mt-2 text-gray-400">to manual roll calls</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-sky-400">100%</p>
          <p className="mt-2 text-gray-400">Accuracy</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-sky-400">5,000+</p>
          <p className="mt-2 text-gray-400">Students</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button className="rounded-lg bg-sky-500 px-10 py-4 font-semibold whitespace-nowrap transition-all duration-200 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-500/30">
          Request Demo
        </button>
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
