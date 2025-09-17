'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  // Mock data for demonstration
  const weeklyAttendance = [
    { day: 'Mon', present: 132, total: 150 },
    { day: 'Tue', present: 138, total: 150 },
    { day: 'Wed', present: 126, total: 150 },
    { day: 'Thu', present: 141, total: 150 },
    { day: 'Fri', present: 144, total: 150 },
  ];

  const monthlyStats = {
    totalStudents: 150,
    averageAttendance: 87,
    totalClasses: 45,
    attendanceTrend: '+2.5%',
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">View attendance patterns and student performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Enrolled this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.averageAttendance}%</div>
              <p className="text-xs text-muted-foreground">{monthlyStats.attendanceTrend} from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlyStats.totalClasses}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">Above target (85%)</p>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance Overview</CardTitle>
            <CardDescription>Daily attendance for the current week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyAttendance.map((day) => {
                const percentage = Math.round((day.present / day.total) * 100);
                return (
                  <div key={day.day} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium">{day.day}</div>
                    <div className="flex-1">
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-primary h-4 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="w-16 text-sm text-right">
                      {day.present}/{day.total} ({percentage}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Student Performance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performers</CardTitle>
              <CardDescription>Students with highest attendance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Alice Johnson', attendance: '98%', grade: '10th' },
                  { name: 'Michael Chen', attendance: '96%', grade: '11th' },
                  { name: 'Sarah Williams', attendance: '95%', grade: '10th' },
                ].map((student, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">{student.attendance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Trends</CardTitle>
              <CardDescription>Monthly attendance patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { month: 'September', rate: '89%' },
                  { month: 'October', rate: '92%' },
                  { month: 'November', rate: '87%' },
                ].map((month, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{month.month}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{month.rate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}