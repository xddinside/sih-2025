"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface AttendanceRecord {
  _id: string;
  sessionName?: string;
  markedAt: number;
  sessionId: string;
  studentId: string;
  studentEmail: string;
}

interface AttendanceChartProps {
  attendanceData: AttendanceRecord[];
}

export default function AttendanceChart({
  attendanceData,
}: AttendanceChartProps) {
  // Process data to group by date
  const processData = () => {
    const dateMap = new Map<string, number>();

    attendanceData.forEach((record) => {
      if (record.sessionName) {
        const date = new Date(record.markedAt).toLocaleDateString();
        dateMap.set(date, (dateMap.get(date) ?? 0) + 1);
      }
    });

    // Convert to array and sort by date
    const sortedData = Array.from(dateMap.entries())
      .map(([date, count]) => {
        const fullDate = new Date(date).toISOString().split("T")[0]!;
        return {
          date,
          attendance: count,
          fullDate,
        };
      })
      .sort((a, b) => {
        const dateA = new Date(a.fullDate);
        const dateB = new Date(b.fullDate);
        return dateA.getTime() - dateB.getTime();
      });

    return sortedData;
  };

  const chartData = processData();

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Attendance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-64 items-center justify-center">
            No attendance data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                label={{
                  value: "Lectures Attended",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                formatter={(value: number) => [
                  `${value} lecture${value !== 1 ? "s" : ""}`,
                  "Attendance",
                ]}
                labelFormatter={(label: string) => `Date: ${label}`}
              />
              <Bar dataKey="attendance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
