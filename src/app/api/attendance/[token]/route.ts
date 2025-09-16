import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } },
) {
  // Helper function to build and return a redirect response
  const redirect = (
    status: "success" | "error" | "warning",
    heading: string,
    message: string,
  ) => {
    const url = request.nextUrl.clone();
    url.pathname = "/attendance/status";
    url.searchParams.set("status", status);
    url.searchParams.set("heading", heading);
    url.searchParams.set("message", message);
    return NextResponse.redirect(url);
  };

  try {
    const { userId, getToken } = await auth();

    if (!userId) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("redirect_url", request.url);
      return NextResponse.redirect(signInUrl);
    }

    const convexToken = await getToken({ template: "convex" });

    // Handle cases where the token might not be available
    if (!convexToken) {
      return redirect(
        "error",
        "Authentication Error",
        "Could not verify your identity. Please sign in and try again.",
      );
    }
    convex.setAuth(convexToken);

    const { token } = params;

    // Get IP address reliably from headers
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",").shift()?.trim() ?? "unknown";

    const sessionInfo = await convex.query(api.attendance.getSessionInfo, {
      token,
    });

    if (!sessionInfo) {
      return redirect(
        "error",
        "Invalid Session",
        "This attendance link is not valid or has been disabled.",
      );
    }

    if (!sessionInfo.isActive) {
      return redirect(
        "warning",
        "Session Expired",
        `The attendance session for "${sessionInfo.sessionName}" has ended. Please contact your instructor.`,
      );
    }

    // Try to mark attendance
    try {
      const result = await convex.mutation(api.attendance.markAttendance, {
        token,
        ipAddress,
      });

      return redirect(
        "success",
        "Attendance Marked!",
        `Your attendance for <strong>${
          result.sessionName
        }</strong> has been recorded.<br><small>Marked at: ${new Date(
          result.markedAt,
        ).toLocaleString()}</small>`,
      );
    } catch (convexError: unknown) {
      const errorMessage =
        convexError instanceof Error
          ? convexError.message
          : "An error occurred while marking attendance.";

      return redirect("error", "Unable to Mark Attendance", errorMessage);
    }
  } catch (error) {
    console.error("Critical attendance marking error:", error);
    return redirect(
      "error",
      "Server Error",
      "An unexpected server error occurred. Please try again later.",
    );
  }
}
