import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(
  ({ icon, title, description }) => {
    return (
      <div className="flex items-center space-x-4 rounded-lg border border-gray-700/50 bg-gray-800/30 p-6">
        <div className="flex-shrink-0 rounded-md bg-gray-900 p-3">{icon}</div>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    );
  },
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
