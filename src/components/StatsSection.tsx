import React from "react";

const StatsSection: React.FC = React.memo(() => {
  return (
    <section className="border-border bg-card/50 mt-32 flex flex-col items-center justify-between gap-8 rounded-2xl border p-12 lg:flex-row lg:gap-16">
      <div className="grid w-full grid-cols-1 gap-10 text-center sm:grid-cols-3 lg:text-left">
        <div>
          <p className="text-primary text-4xl font-bold">95% Faster</p>
          <p className="text-muted-foreground mt-2">to manual roll calls</p>
        </div>
        <div>
          <p className="text-primary text-4xl font-bold">100%</p>
          <p className="text-muted-foreground mt-2">Accuracy</p>
        </div>
        <div>
          <p className="text-primary text-4xl font-bold">5,000+</p>
          <p className="text-muted-foreground mt-2">Students</p>
        </div>
      </div>
      <div className="flex-shrink-0">
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30 rounded-lg px-10 py-4 font-semibold whitespace-nowrap transition-all duration-200 hover:shadow-lg">
          Request Demo
        </button>
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
