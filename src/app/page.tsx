import React from 'react';

// I've included the necessary icons as inline SVG components
// to keep everything in a single file for you.

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3L16 21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const GridIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

const BarChartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

const ComputerIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="14" height="8" x="5" y="2" rx="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" />
    <path d="M6 18h2" />
    <path d="M12 18h6" />
  </svg>
);


const GlobeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 A 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

// Main Page Component
export default function LandingPage() {
  return (
    <div className="bg-[#0B0E13] text-white font-sans overflow-x-hidden">
      <header className="container mx-auto px-8 lg:px-24 flex justify-between items-center py-8 border-b border-gray-800">
        <div className="flex items-center">
          <LogoIcon />
        </div>
        <nav className="hidden md:flex items-center space-x-10">
          <a href="/about" className="group text-gray-400 hover:text-white transition duration-300">
            About
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-sky-500"></span>
          </a>
          <a href="/features" className="group text-gray-400 hover:text-white transition duration-300">
            Features
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-sky-500"></span>
          </a>
          <a href="/contact" className="group text-gray-400 hover:text-white transition duration-300">
            Contact
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-100 h-0.5 bg-sky-500"></span>
          </a>
        </nav>
      </header>

      <main className="pt-20 pb-32">
        {/* Hero Section */}
        <section className="relative">
          <div className="container mx-auto px-8 lg:px-24">
            <div className="lg:w-[45%] text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
                Redefining Attendance for the Digital Classroom
              </h1>
              <p className="mt-8 text-lg text-gray-300">
                Automated, reliable, and data-driven attendance monitoring for modern colleges.
              </p>
              <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="px-8 py-3 bg-sky-500 hover:bg-sky-600 rounded-md font-semibold transition-transform transform hover:scale-105 shadow-lg shadow-sky-500/20">
                  Get Started
                </button>
                <button className="px-8 py-3 bg-transparent border border-gray-700 hover:bg-gray-800/50 rounded-md font-semibold transition-colors">
                  View Demo
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-[55%] -mr-16">
            <div className="bg-[#1C1E2A]/60 p-6 rounded-2xl border border-gray-700/50 shadow-2xl shadow-sky-500/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-xl">Dashboard</h3>
              </div>
              <div className="bg-[#11131E] p-4 rounded-lg">
                <p className="text-gray-400 text-sm mb-2">Attendance</p>
                {/* Simplified graph representation */}
                <div className="h-40 w-full relative">
                  <svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
                    <path d="M 0 70 L 60 25 L 120 65 L 180 55 L 240 85 L 300 45" stroke="#0EA5E9" fill="none" strokeWidth="2" />
                  </svg>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                <div className="bg-[#11131E] p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Total Attendance</p>
                  <p className="text-2xl font-bold mt-1">1,245</p>
                </div>
                <div className="bg-[#11131E] p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Attendance %</p>
                  <p className="text-2xl font-bold mt-1">75%</p>
                </div>
                <div className="bg-[#11131E] p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Performance</p>
                  <p className="text-2xl font-bold mt-1">320</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-8 lg:px-24">
          {/* Features Section */}
          <section className="mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<GridIcon className="w-8 h-8 text-sky-400" />}
              title="Automated Attendance"
              description="QR, face scan, biometrics"
            />
            <FeatureCard
              icon={<BarChartIcon className="w-8 h-8 text-sky-400" />}
              title="Analytics & Reports"
              description="Student engagement"
            />
            <FeatureCard
              icon={<ComputerIcon className="w-8 h-8 text-sky-400" />}
              title="Real-time Dashboard"
              description="Faculty/Admin"
            />
            <FeatureCard
              icon={<GlobeIcon className="w-8 h-8 text-sky-400" />}
              title="Works Online + Offline"
              description="In-person and virtual"
            />
          </section>

          {/* Stats & CTA section */}
          <section className="mt-32 flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-16 bg-[#1C1E2A]/50 p-12 rounded-2xl border border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center lg:text-left w-full">
              <div>
                <p className="text-4xl font-bold text-sky-400">95% Faster</p>
                <p className="text-gray-400 mt-2">to manual roll calls</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sky-400">100%</p>
                <p className="text-gray-400 mt-2">Accuracy</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-sky-400">5,000+</p>
                <p className="text-gray-400 mt-2">Students</p>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button className="px-10 py-4 bg-sky-500 hover:bg-sky-600 rounded-md font-semibold transition-transform transform hover:scale-105 whitespace-nowrap shadow-lg shadow-sky-500/20">
                Request Demo
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800/30 p-6 rounded-lg border border-gray-700/50 flex items-center space-x-4">
      <div className="flex-shrink-0 bg-gray-900 p-3 rounded-md">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}


