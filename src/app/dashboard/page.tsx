"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Convex hooks
  const currentUser = useQuery(
    api.attendance.getCurrentUser,
    isSignedIn ? undefined : "skip",
  );
  const studentAttendance = useQuery(
    api.attendance.getStudentAttendance,
    isSignedIn && currentUser?.role === "student" ? undefined : "skip",
  );
  const syncUserProfile = useMutation(api.attendance.syncUserProfile);

  // Sync user profile on load
  useEffect(() => {
    if (user && isSignedIn && !currentUser) {
      void syncUserProfile({
        clerkId: user.id,
        email: user.primaryEmailAddress?.emailAddress ?? "",
        name:
        user.fullName ??
          `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      });
    }
  }, [user, isSignedIn, currentUser, syncUserProfile]);

  // Redirect to role selection if needed
  useEffect(() => {
    if (isLoaded && isSignedIn && currentUser && !currentUser.role) {
      router.push("/role-selection");
    }
  }, [isLoaded, isSignedIn, currentUser, router]);

  if (!isLoaded || (isSignedIn && !currentUser)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </div>
      </div>
    );
  }

  // Render based on role
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.firstName ?? "user"}!
        </p>
      </div>

      {currentUser?.role === "faculty" && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Faculty Analytics</h2>
          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground">
              Analytics and reports for your lectures will be displayed here.
            </p>
          </div>
        </div>
      )}

      {currentUser?.role === "student" && (
        <div>
          <h2 className="mb-4 text-2xl font-bold">Your Attendance</h2>
          {studentAttendance && studentAttendance.length > 0 ? (
            <div className="bg-card rounded-lg border">
              <table className="w-full text-left">
                <thead className="border-b">
                  <tr>
                    <th className="p-4">Lecture</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {studentAttendance.map((record) => (
                    <tr key={record._id} className="border-b">
                      <td className="p-4">{record.sessionName}</td>
                      <td className="p-4">
                        {new Date(record.markedAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted-foreground">
              You haven&apos;t marked attendance for any lectures yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
