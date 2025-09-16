// src/app/dashboard/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import type { Doc } from "convex/_generated/dataModel";
import AttendanceQR from "~/components/AttendanceQR";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function DashboardPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // State for the UI
  const [newLectureName, setNewLectureName] = useState("");
  const [sessionLecture, setSessionLecture] = useState<Doc<"lectures"> | null>(
    null,
  );
  const [isCreatingLecture, setIsCreatingLecture] = useState(false);

  // Convex hooks
  const lectures = useQuery(
    api.attendance.getAllLectures,
    isSignedIn ? undefined : "skip",
  );
  const currentUser = useQuery(
    api.attendance.getCurrentUser,
    isSignedIn ? undefined : "skip",
  );
  const studentAttendance = useQuery(
    api.attendance.getStudentAttendance,
    isSignedIn && currentUser?.role === "student" ? undefined : "skip",
  );
  const createLecture = useMutation(api.attendance.createLecture);
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

  const handleCreateLecture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLectureName.trim()) return;

    setIsCreatingLecture(true);
    try {
      await createLecture({ name: newLectureName.trim() });
      setNewLectureName(""); // Clear input
    } catch (error) {
      console.error("Failed to create lecture:", error);
    } finally {
      setIsCreatingLecture(false);
    }
  };

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
        <div className="space-y-8">
          {/* Section to create a QR code session */}
          {sessionLecture && (
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Current Attendance Session
                </h2>
                <Button
                  variant="outline"
                  onClick={() => setSessionLecture(null)}
                >
                  Close
                </Button>
              </div>
              <AttendanceQR
                sessionName={sessionLecture.name}
                lectureId={sessionLecture._id}
                durationMinutes={15}
              />
            </div>
          )}

          {/* Section to create a new lecture */}
          <div className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Create a New Lecture</h2>
            <form
              onSubmit={handleCreateLecture}
              className="flex items-center gap-4"
            >
              <Input
                type="text"
                placeholder="E.g., Week 3: State Management"
                value={newLectureName}
                onChange={(e) => setNewLectureName(e.target.value)}
                className="flex-grow"
              />
              <Button
                type="submit"
                disabled={!newLectureName.trim() || isCreatingLecture}
                className="cursor-pointer"
              >
                {isCreatingLecture ? "Creating..." : "Create Lecture"}
              </Button>
            </form>
          </div>

          {/* Section to list existing lectures */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">Your Lectures</h2>
            {lectures && lectures.length > 0 ? (
              <div className="space-y-4">
                {lectures.map((lecture) => (
                  <div
                    key={lecture._id}
                    className="bg-card flex items-center justify-between rounded-lg border p-4"
                  >
                    <div>
                      <h3 className="font-semibold">{lecture.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Created:{" "}
                        {new Date(lecture.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => setSessionLecture(lecture)}
                      disabled={!!sessionLecture}
                      className="cursor-pointer"
                    >
                      Start Session
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
                <p className="text-muted-foreground">
                  You haven&apos;t created any lectures yet.
                </p>
              )}
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
