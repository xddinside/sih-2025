import React from "react";
import GridIcon from "./icons/GridIcon";
import BarChartIcon from "./icons/BarChartIcon";
import ComputerIcon from "./icons/ComputerIcon";
import GlobeIcon from "./icons/GlobeIcon";
import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = React.memo(() => {
  return (
    <section className="mt-32 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <FeatureCard
        icon={<GridIcon className="h-8 w-8 text-sky-400" />}
        title="Automated Attendance"
        description="QR, face scan, biometrics"
      />
      <FeatureCard
        icon={<BarChartIcon className="h-8 w-8 text-sky-400" />}
        title="Analytics & Reports"
        description="Student engagement"
      />
      <FeatureCard
        icon={<ComputerIcon className="h-8 w-8 text-sky-400" />}
        title="Real-time Dashboard"
        description="Faculty/Admin"
      />
      <FeatureCard
        icon={<GlobeIcon className="h-8 w-8 text-sky-400" />}
        title="Works Online + Offline"
        description="In-person and virtual"
      />
    </section>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
