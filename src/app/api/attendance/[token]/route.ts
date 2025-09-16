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
  try {
    const { userId, getToken } = await auth();

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    const convexToken = await getToken({ template: "convex" });

    if (!convexToken) {
      throw new Error("Failed to retrieve authentication token.");
    }
    convex.setAuth(convexToken);

    const { token } = params;

    // Get client IP address
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ipAddress = forwardedFor?.split(",")[0] ?? realIp ?? "unknown";

    // First, get session info to check if it's valid
    const sessionInfo = await convex.query(api.attendance.getSessionInfo, {
      token,
    });

    if (!sessionInfo) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Session</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; background: #f5f5f5; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .error { color: #dc2626; }
            .button { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">Invalid Attendance Session</h1>
            <p>This attendance link is not valid or has been disabled.</p>
            <a href="/" class="button">Go to Home</a>
          </div>
        </body>
        </html>
      `,
        {
          status: 404,
          headers: { "Content-Type": "text/html" },
        },
      );
    }

    if (!sessionInfo.isActive) {
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Session Expired</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; background: #f5f5f5; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .warning { color: #d97706; }
            .button { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="warning">Session Expired</h1>
            <p>The attendance session "${
              sessionInfo.sessionName
            }" has expired.</p>
            <p>Please contact your instructor for assistance.</p>
            <a href="/" class="button">Go to Home</a>
          </div>
        </body>
        </html>
      `,
        {
          status: 410,
          headers: { "Content-Type": "text/html" },
        },
      );
    }

    // Try to mark attendance
    try {
      const result = await convex.mutation(api.attendance.markAttendance, {
        token,
        ipAddress,
      });

      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Attendance Marked</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; background: #f5f5f5; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .success { color: #16a34a; }
            .info { color: #6b7280; font-size: 0.875rem; margin-top: 1rem; }
            .button { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="success">✅ Attendance Marked Successfully!</h1>
            <p><strong>${result.sessionName}</strong></p>
            <p>Your attendance has been recorded.</p>
            <p class="info">Marked at: ${new Date(
              result.markedAt,
            ).toLocaleString()}</p>
            <a href="/" class="button">Go to Home</a>
          </div>
        </body>
        </html>
      `,
        {
          headers: { "Content-Type": "text/html" },
        },
      );
    } catch (convexError: unknown) {
      const errorMessage =
        convexError instanceof Error
          ? convexError.message
          : "An error occurred while marking attendance.";
      return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Attendance Error</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { font-family: system-ui; text-align: center; padding: 2rem; background: #f5f5f5; }
            .container { max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
            .error { color: #dc2626; }
            .button { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 1rem; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">❌ Unable to Mark Attendance</h1>
            <p>${errorMessage}</p>
            <a href="/" class="button">Go to Home</a>
          </div>
        </body>
        </html>
      `,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        },
      );
    }
  } catch (error) {
    console.error("Attendance marking error:", error);
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Server Error</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { font-family: system-ui; text-align: center; padding: 2rem; background: #f5f5f5; }
          .container { max-width: 400px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .error { color: #dc2626; }
          .button { background: #2563eb; color: white; padding: 12px 24px; border: none; border-radius: 6px; text-decoration: none; display: inline-block; margin-top: 1rem; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="error">Server Error</h1>
          <p>An unexpected error occurred. Please try again later.</p>
          <a href="/" class="button">Go to Home</a>
        </div>
      </body>
      </html>
    `,
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      },
    );
  }
}
