"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

function StatusDisplay() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const heading = searchParams.get("heading");
  const message = searchParams.get("message");

  const statusConfig = {
    success: {
      Icon: CheckCircle2,
      className: "text-green-500",
      defaultHeading: "Success!",
    },
    error: {
      Icon: XCircle,
      className: "text-red-500",
      defaultHeading: "Error!",
    },
    warning: {
      Icon: AlertTriangle,
      className: "text-yellow-500",
      defaultHeading: "Warning!",
    },
  };

  const { Icon, className, defaultHeading } =
    statusConfig[status as keyof typeof statusConfig] ?? statusConfig.error;

  return (
    <div className="bg-background flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="border-border/50 bg-card/30 text-card-foreground flex flex-col items-center space-y-6 rounded-lg border p-8 shadow-sm">
          <Icon className={`${className} h-16 w-16`} />
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-bold">{heading ?? defaultHeading}</h1>
            <p
              className="text-muted-foreground"
              dangerouslySetInnerHTML={{
                __html: message ?? "An unexpected error occurred.",
              }}
            />
          </div>
          <Button asChild className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Using Suspense is a best practice when using useSearchParams
export default function AttendanceStatusPage() {
  return (
    <Suspense>
      <StatusDisplay />
    </Suspense>
  );
}
