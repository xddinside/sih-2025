import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = React.memo(
  ({ icon, title, description }) => {
    return (
      <div className="border-border/50 bg-card/30 flex items-center space-x-4 rounded-lg border p-6">
        <div className="bg-muted flex-shrink-0 rounded-md p-3">{icon}</div>
        <div>
          <h3 className="text-foreground font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
    );
  },
);

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
