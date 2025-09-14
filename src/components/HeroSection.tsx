"use client";
import Link from "next/link";
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
            <Link href="/sign-up">
              <button className="bg-primary/90 text-primary-foreground hover:bg-primary hover:shadow-primary/30 cursor-pointer rounded-lg px-8 py-3 font-semibold transition-all duration-200 hover:shadow-lg">
                Get Started
              </button>
            </Link>
            <button className="border-border text-foreground hover:border-border/80 hover:bg-muted dark:hover:bg-muted/20 cursor-pointer rounded-lg border bg-transparent px-8 py-3 font-semibold transition-all duration-200">
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
                      stroke="currentColor"
                      strokeWidth="0.5"
                      opacity="0.3"
                      className="text-foreground"
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
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.5"
                  className="text-foreground"
                />
                <line
                  x1="0"
                  y1="40"
                  x2="320"
                  y2="40"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.5"
                  className="text-foreground"
                />
                <line
                  x1="0"
                  y1="60"
                  x2="320"
                  y2="60"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.5"
                  className="text-foreground"
                />
                <line
                  x1="0"
                  y1="80"
                  x2="320"
                  y2="80"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  opacity="0.5"
                  className="text-foreground"
                />

                {/* Attendance line - Present students */}
                <path
                  d="M 0 75 L 40 65 L 80 55 L 120 45 L 160 35 L 200 25 L 240 40 L 280 20 L 320 30"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  className="text-foreground"
                />

                {/* Expected attendance line */}
                <path
                  d="M 0 70 L 40 75 L 80 78 L 120 72 L 160 68 L 200 75 L 240 70 L 280 65 L 320 60"
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                  strokeDasharray="5,5"
                  opacity="0.7"
                  className="text-foreground"
                />

                {/* Data points for present students */}
                <circle
                  cx="0"
                  cy="75"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="40"
                  cy="65"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="80"
                  cy="55"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="120"
                  cy="45"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="160"
                  cy="35"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="200"
                  cy="25"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="240"
                  cy="40"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="280"
                  cy="20"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />
                <circle
                  cx="320"
                  cy="30"
                  r="2.5"
                  fill="currentColor"
                  stroke="hsl(var(--background))"
                  strokeWidth="1"
                  className="text-foreground"
                />

                {/* Fill area under the attendance line */}
                <path
                  d="M 0 75 L 40 65 L 80 55 L 120 45 L 160 35 L 200 25 L 240 40 L 280 20 L 320 30 L 320 100 L 0 100 Z"
                  fill="currentColor"
                  fillOpacity="0.1"
                  className="text-foreground"
                />

                {/* Legend */}
                <g transform="translate(10, 105)">
                  <line
                    x1="0"
                    y1="0"
                    x2="15"
                    y2="0"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="square"
                    className="text-foreground"
                  />
                  <text
                    x="20"
                    y="4"
                    fontSize="10"
                    fill="currentColor"
                    className="text-foreground"
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
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    strokeLinecap="square"
                    opacity="0.7"
                    className="text-foreground"
                  />
                  <text
                    x="20"
                    y="4"
                    fontSize="10"
                    fill="currentColor"
                    className="text-foreground"
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
