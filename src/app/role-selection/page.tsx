"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "~/components/ui/button";
import { GraduationCap, Users } from "lucide-react";

export default function RoleSelectionPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const updateUserRole = useMutation(api.attendance.updateUserRole);

  const handleRoleSelection = async (role: "student" | "faculty") => {
    if (!user) return;

    setIsLoading(true);
    try {
      await updateUserRole({ role });
      // Redirect to dashboard after role selection
      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update role:", error);
      // Handle error - could show a toast or error message
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  return (
    <div className="bg-background flex h-[100vh] items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-foreground mb-4 text-4xl font-bold">
            Welcome to Attendance System
          </h1>
          <p className="text-muted-foreground text-xl">
            Please select your role to continue
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl gap-8 md:grid-cols-2">
          {/* Student Card */}
          <div className="border-border/50 bg-card/30 hover:bg-card/50 rounded-lg border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="pb-6 text-center">
              <div className="bg-muted mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <GraduationCap className="text-primary h-10 w-10" />
              </div>
              <h2 className="text-foreground mb-3 text-2xl font-bold">
                Student
              </h2>
              <p className="text-muted-foreground text-base">
                Mark attendance for your classes using QR codes
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={() => handleRoleSelection("student")}
                disabled={isLoading}
                className="w-full cursor-pointer"
                size="lg"
              >
                {isLoading ? "Setting up..." : "Continue as Student"}
              </Button>
            </div>
          </div>

          {/* Faculty Card */}
          <div className="border-border/50 bg-card/30 hover:bg-card/50 rounded-lg border p-8 shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="pb-6 text-center">
              <div className="bg-muted mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
                <Users className="text-primary h-10 w-10" />
              </div>
              <h2 className="text-foreground mb-3 text-2xl font-bold">
                Faculty
              </h2>
              <p className="text-muted-foreground text-base">
                Create attendance sessions and manage your courses
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={() => handleRoleSelection("faculty")}
                disabled={isLoading}
                className="w-full cursor-pointer"
                size="lg"
              >
                {isLoading ? "Setting up..." : "Continue as Faculty"}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
