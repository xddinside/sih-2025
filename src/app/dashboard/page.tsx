"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import AttendanceQR from "~/components/AttendanceQR";
import { Button } from "~/components/ui/button";

export default function FacultyDashboard() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [showPastSessions, setShowPastSessions] = useState(false);

  // Fetch real course data
  const courses = useQuery(api.attendance.getFacultyCourses);
  const sessions = useQuery(api.attendance.getFacultySessions);
  const currentUser = useQuery(api.attendance.getCurrentUser);
  const syncUserProfile = useMutation(api.attendance.syncUserProfile);

  // Use first course as default if available
  const selectedCourse =
    courses?.find((c) => c._id === selectedCourseId) ?? courses?.[0];

  // Sync user profile on first load
  useEffect(() => {
    if (user && !currentUser) {
      void syncUserProfile({
        clerkId: user.id,
        email:
          user.primaryEmailAddress?.emailAddress ??
          user.emailAddresses[0]?.emailAddress ??
          "",
        name:
          user.fullName ??
          `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        // Don't set role here - let user choose
      });
    }
  }, [user, currentUser, syncUserProfile]);

  // Redirect to role selection if user doesn't have a role
  useEffect(() => {
    if (currentUser && !currentUser.role) {
      router.push("/role-selection");
    }
  }, [currentUser, router]);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Please sign in
      </div>
    );
  }

  // Show loading while checking user role
  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-2">Loading user profile...</p>
        </div>
      </div>
    );
  }

  // If user doesn't have a role, they should have been redirected
  if (!currentUser.role) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-2">
            Redirecting to role selection...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">
          {currentUser.role === "faculty"
            ? "Faculty Dashboard"
            : "Student Dashboard"}
        </h1>
        <p className="text-muted-foreground">
          Welcome back, {user.firstName}!{" "}
          {currentUser.role === "faculty"
            ? "Manage your attendance sessions below."
            : "View your attendance records and courses."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Course Selection */}
        {courses && courses.length > 1 && (
          <div className="bg-card rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Select Course</h2>
            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <Button
                  key={course._id}
                  variant={
                    selectedCourse?._id === course._id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCourseId(course._id)}
                >
                  {course.code}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Course Info */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Course Information</h2>
          <div className="space-y-2">
            {selectedCourse ? (
              <>
                <p>
                  <strong>Course:</strong> {selectedCourse.name}
                </p>
                <p>
                  <strong>Code:</strong> {selectedCourse.code}
                </p>
                <p>
                  <strong>Department:</strong> {selectedCourse.department}
                </p>
                <p>
                  <strong>Semester:</strong> {selectedCourse.semester}{" "}
                  {selectedCourse.academicYear}
                </p>
              </>
            ) : (
              <p className="text-muted-foreground">
                No courses found. Please create a course first.
              </p>
            )}
            <p>
              <strong>Instructor:</strong> {user?.fullName ?? user?.firstName}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="space-y-3">
            <Button
              onClick={() => setShowQR(true)}
              className="w-full"
              disabled={showQR || !selectedCourse}
            >
              Start Attendance Session
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowPastSessions(!showPastSessions)}
            >
              {showPastSessions ? "Hide" : "View"} Past Sessions
            </Button>
            <Button variant="outline" className="w-full">
              Export Attendance
            </Button>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      {showQR && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Current Attendance Session</h2>
            <Button variant="outline" onClick={() => setShowQR(false)}>
              Close Session
            </Button>
          </div>

          {selectedCourse && (
            <AttendanceQR
              sessionName={`${selectedCourse.code} - ${new Date().toLocaleDateString()}`}
              courseId={selectedCourse._id}
              durationMinutes={15}
            />
          )}
        </div>
      )}

      {/* Past Sessions */}
      {showPastSessions && (
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Past Attendance Sessions</h2>
          {sessions && sessions.length > 0 ? (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div
                  key={session._id}
                  className="bg-card rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{session.sessionName}</h3>
                      <p className="text-muted-foreground text-sm">
                        Created: {new Date(session.createdAt).toLocaleString()}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Expires: {new Date(session.expiresAt).toLocaleString()}
                      </p>
                      <p className="text-sm">
                        Status:{" "}
                        <span
                          className={
                            session.isActive && Date.now() < session.expiresAt
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {session.isActive && Date.now() < session.expiresAt
                            ? "Active"
                            : "Expired"}
                        </span>
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No past sessions found.</p>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="bg-muted/50 mt-8 rounded-lg p-6">
        <h3 className="mb-3 text-lg font-semibold">How it works:</h3>
        <ol className="list-inside list-decimal space-y-2 text-sm">
          <li>
            Click &quot;Start Attendance Session&quot; to generate a unique QR
            code
          </li>
          <li>Students scan the QR code with their phones</li>
          <li>They&apos;ll be redirected to a secure attendance page</li>
          <li>Their attendance is automatically recorded</li>
          <li>Each QR code is unique and expires after the set duration</li>
        </ol>
      </div>
    </div>
  );
}
