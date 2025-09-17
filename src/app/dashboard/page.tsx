"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Users,
  Calendar,
  TrendingUp,
  Clock,
  BarChart3,
  GraduationCap,
  UserCheck,
  FileText,
} from "lucide-react";

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
  const facultyAnalytics = useQuery(
    api.attendance.getFacultyAnalytics,
    isSignedIn && currentUser?.role === "faculty" ? undefined : "skip",
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
        <div className="space-y-6">
          <div>
            <h2 className="text-foreground text-2xl font-bold">
              Faculty Dashboard
            </h2>
            <p className="text-muted-foreground mt-2">
              Welcome to SIH 2025 - Manage your classroom attendance efficiently
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Students
                </CardTitle>
                <Users className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {facultyAnalytics?.uniqueStudents || 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  Unique students attended
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Attendance
                </CardTitle>
                <Calendar className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {facultyAnalytics?.totalSessions || 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  Attendance sessions created
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Attendance
                </CardTitle>
                <TrendingUp className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {facultyAnalytics?.averageAttendance || 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  Students per session
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Sessions
                </CardTitle>
                <Clock className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {facultyAnalytics?.totalAttendanceRecords || 0}
                </div>
                <p className="text-muted-foreground text-xs">
                  Attendance marks recorded
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to get you started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <UserCheck className="mr-2 h-4 w-4" />
                  Start Attendance Session
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => router.push("/analytics")}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
                <Button
                  className="w-full justify-start"
                  variant="outline"
                  onClick={() => router.push("/analytics")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest attendance sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      subject: "Data Structures",
                      time: "10:00 AM",
                      attendance: "28/30",
                    },
                    {
                      subject: "Algorithms",
                      time: "2:00 PM",
                      attendance: "25/30",
                    },
                    {
                      subject: "Database Systems",
                      time: "4:00 PM",
                      attendance: "27/30",
                    },
                  ].map((session, index) => (
                    <div
                      key={index}
                      className="bg-muted/50 flex items-center justify-between rounded-lg p-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{session.subject}</p>
                        <p className="text-muted-foreground text-xs">
                          {session.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {session.attendance}
                        </p>
                        <p className="text-muted-foreground text-xs">present</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
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
