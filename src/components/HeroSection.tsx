import React from "react";

const HeroSection: React.FC = React.memo(() => {
  return (
    <section className="relative">
      <div className="container mx-auto max-w-7xl px-8 lg:px-24">
        <div className="text-center lg:w-[55%] lg:text-left">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Redefining Attendance for the Digital Classroom
          </h1>
          <p className="text-muted-foreground mt-8 text-lg">
            Automated, reliable, and data-driven attendance monitoring for
            modern colleges.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4 lg:justify-start">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/30 rounded-lg px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
              Get Started
            </button>
            <button className="border-border text-foreground hover:border-border/80 hover:bg-muted/20 rounded-lg border bg-transparent px-8 py-3 font-semibold transition-all duration-200">
              View Demo
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Mockup */}
      <div className="absolute top-1/2 right-0 -mr-16 hidden w-[45%] -translate-y-1/2 lg:block">
        <div className="border-border/50 bg-card/60 shadow-primary/10 rounded-2xl border p-6 shadow-2xl backdrop-blur-sm">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-foreground text-xl font-bold">Dashboard</h3>
          </div>
          <div className="bg-card rounded-lg p-4">
            <p className="text-muted-foreground mb-2 text-sm">
              Weekly Attendance Trend
            </p>
            {/* Enhanced graph representation */}
            <div className="relative h-40 w-full">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 320 120"
                preserveAspectRatio="xMidYMid meet"
                className="overflow-visible"
              >
                {/* Grid lines */}
                <defs>
                  <pattern
                    id="grid"
                    width="32"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 20"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="0.5"
                      opacity="0.3"
                    />
                  </pattern>
                </defs>
                <rect width="320" height="100" fill="url(#grid)" />

                {/* Horizontal grid lines */}
                <line
                  x1="0"
                  y1="20"
                  x2="320"
                  y2="20"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1="40"
                  x2="320"
                  y2="40"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1="60"
                  x2="320"
                  y2="60"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.5"
                />
                <line
                  x1="0"
                  y1="80"
                  x2="320"
                  y2="80"
                  stroke="hsl(var(--border))"
                  strokeWidth="0.5"
                  opacity="0.5"
                />

                {/* Attendance line - Present students (more variance, corner-centric) */}
                <path
                  d="M 0 75 L 20 85 L 40 65 L 60 90 L 80 55 L 100 70 L 120 45 L 140 80 L 160 35 L 180 60 L 200 25 L 220 75 L 240 40 L 260 55 L 280 20 L 300 65 L 320 30"
                  stroke="hsl(var(--primary))"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                />

                {/* Expected attendance line (more variance) */}
                <path
                  d="M 0 70 L 20 68 L 40 75 L 60 62 L 80 78 L 100 55 L 120 72 L 140 48 L 160 68 L 180 52 L 200 75 L 220 45 L 240 70 L 260 50 L 280 65 L 300 55 L 320 60"
                  stroke="hsl(var(--muted-foreground))"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeDasharray="5,5"
                />

                {/* Data points for present students */}
                <circle
                  cx="0"
                  cy="75"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="40"
                  cy="65"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="80"
                  cy="55"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="120"
                  cy="45"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="160"
                  cy="35"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="200"
                  cy="25"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="240"
                  cy="40"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="280"
                  cy="20"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />
                <circle
                  cx="320"
                  cy="30"
                  r="2.5"
                  fill="hsl(var(--primary))"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                />

                {/* Fill area under the attendance line */}
                <path
                  d="M 0 75 L 20 85 L 40 65 L 60 90 L 80 55 L 100 70 L 120 45 L 140 80 L 160 35 L 180 60 L 200 25 L 220 75 L 240 40 L 260 55 L 280 20 L 300 65 L 320 30 L 320 100 L 0 100 Z"
                  fill="hsl(var(--primary))"
                  fillOpacity="0.08"
                />

                {/* Legend */}
                <g transform="translate(10, 105)">
                  <line
                    x1="0"
                    y1="0"
                    x2="15"
                    y2="0"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="square"
                  />
                  <text
                    x="20"
                    y="4"
                    fontSize="10"
                    fill="hsl(var(--foreground))"
                  >
                    Present
                  </text>
                </g>
                <g transform="translate(80, 105)">
                  <line
                    x1="0"
                    y1="0"
                    x2="15"
                    y2="0"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    strokeLinecap="square"
                  />
                  <text
                    x="20"
                    y="4"
                    fontSize="10"
                    fill="hsl(var(--foreground))"
                  >
                    Expected
                  </text>
                </g>
              </svg>
            </div>
            <div className="text-muted-foreground mt-2 flex justify-between px-2 text-xs">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
              <span>Week 5</span>
              <span>Week 6</span>
              <span>Week 7</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="bg-card rounded-lg p-4">
              <p className="text-muted-foreground text-sm">Total Attendance</p>
              <p className="text-foreground mt-1 text-2xl font-bold">1,245</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <p className="text-muted-foreground text-sm">Attendance %</p>
              <p className="text-foreground mt-1 text-2xl font-bold">75%</p>
            </div>
            <div className="bg-card rounded-lg p-4">
              <p className="text-muted-foreground text-sm">Performance</p>
              <p className="text-foreground mt-1 text-2xl font-bold">320</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
