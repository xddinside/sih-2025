"use client";

import { useQRCode } from "next-qrcode";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Button } from "./ui/button";
import type { Id } from "convex/_generated/dataModel";

interface AttendanceQRProps {
  sessionName: string;
  lectureId: Id<"lectures">;
  durationMinutes?: number;
}

export default function AttendanceQR({
  sessionName,
  lectureId,
  durationMinutes = 15,
}: AttendanceQRProps) {
  const { SVG } = useQRCode();
  const [sessionData, setSessionData] = useState<{
    token: string;
    expiresAt: number;
    sessionId: Id<"attendanceSessions">;
  } | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);

  const createSession = useMutation(api.attendance.createAttendanceSession);
  const refreshSession = useMutation(api.attendance.refreshSessionToken);

  useEffect(() => {
    if (!sessionData) return;

    const handler = () => {
      void (async () => {
        if (Date.now() < sessionData.expiresAt) {
          try {
            const result = await refreshSession({
              sessionId: sessionData.sessionId,
            });
            setSessionData((prev) =>
              prev ? { ...prev, token: result.token } : null,
            );
          } catch (error) {
            console.error("Failed to refresh session token:", error);
          }
        }
      })();
    };

    const timer = setInterval(handler, 30000); // 30 seconds

    return () => clearInterval(timer);
  }, [sessionData, refreshSession]);

  const handleCreateSession = async () => {
    setIsCreatingSession(true);
    try {
      const result = await createSession({
        sessionName,
        lectureId,
        durationMinutes,
      });

      setSessionData({
        token: result.token,
        expiresAt: result.expiresAt,
        sessionId: result.sessionId,
      });
    } catch (error) {
      console.error("Failed to create attendance session:", error);
      alert("Failed to create attendance session. Please try again.");
    } finally {
      setIsCreatingSession(false);
    }
  };

  const attendanceUrl =
    sessionData && typeof window !== "undefined"
      ? `${window.location.origin}/api/attendance/${sessionData.token}`
      : "";

  const isExpired = sessionData && Date.now() > sessionData.expiresAt;
  const remainingTime = sessionData
    ? Math.max(0, Math.ceil((sessionData.expiresAt - Date.now()) / 1000 / 60))
    : 0;

  if (!sessionData) {
    return (
      <div className="bg-card flex flex-col items-center space-y-4 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Start Attendance Session</h2>
        <div className="text-center">
          <p className="text-muted-foreground mb-2">Lecture: {sessionName}</p>
          <p className="text-muted-foreground mb-4">
            Duration: {durationMinutes} minutes
          </p>
        </div>
        <Button
          onClick={handleCreateSession}
          className="w-full"
          disabled={isCreatingSession}
        >
          {isCreatingSession ? "Generating..." : "Generate QR Code"}
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card flex flex-col items-center space-y-4 rounded-lg border p-6">
      <h2 className="text-xl font-semibold">Attendance QR Code</h2>

      <div className="text-center">
        <p className="font-medium">{sessionName}</p>
        <p className="text-muted-foreground mb-4 text-sm">
          {isExpired ? "Session Expired" : `${remainingTime} minutes remaining`}
        </p>
      </div>

      {!isExpired && (
        <div className="rounded-lg border-2 border-gray-200 bg-white p-4">
          <SVG
            text={attendanceUrl}
            options={{
              errorCorrectionLevel: "M",
              margin: 2,
              scale: 4,
              width: 256,
              color: {
                dark: "#000",
                light: "#FFFFFF",
              },
            }}
          />
        </div>
      )}

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-xs">
          Students scan this QR code to mark attendance
        </p>
        <p className="text-muted-foreground text-xs">
          URL: {attendanceUrl.substring(0, 40)}...
        </p>
      </div>

      {isExpired && (
        <Button
          onClick={handleCreateSession}
          variant="outline"
          className="w-full"
        >
          Generate New Session
        </Button>
      )}
    </div>
  );
}
