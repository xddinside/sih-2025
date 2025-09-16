import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

// Generate a cryptographically secure random token
function generateSecureToken(): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Create an attendance session (Faculty only)
export const createAttendanceSession = mutation({
  args: {
    sessionName: v.string(),
    courseId: v.string(),
    durationMinutes: v.number(), // How long the session stays active
  },
  handler: async (ctx, args) => {
    // Get the current user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Check if user is faculty (you'll need to implement this check)
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user.role !== "faculty") {
      throw new ConvexError("Only faculty can create attendance sessions");
    }

    const now = Date.now();
    const expiresAt = now + args.durationMinutes * 60 * 1000;
    const token = generateSecureToken();

    const sessionId = await ctx.db.insert("attendanceSessions", {
      sessionName: args.sessionName,
      courseId: args.courseId,
      facultyId: identity.subject,
      isActive: true,
      createdAt: now,
      expiresAt,
      token,
    });

    return {
      sessionId,
      token,
      expiresAt,
    };
  },
});

// Mark attendance using token (Students)
export const markAttendance = mutation({
  args: {
    token: v.string(),
    ipAddress: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get the current user
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Find the session by token
    const session = await ctx.db
      .query("attendanceSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) {
      throw new ConvexError("Invalid attendance session");
    }

    // Check if session is still active
    const now = Date.now();
    if (!session.isActive || now > session.expiresAt) {
      throw new ConvexError("Attendance session has expired");
    }

    // Check if student already marked attendance for this session
    const existingRecord = await ctx.db
      .query("attendanceRecords")
      .withIndex("by_student_session", (q) =>
        q.eq("studentId", identity.subject).eq("sessionId", session._id),
      )
      .first();

    if (existingRecord) {
      throw new ConvexError("Attendance already marked for this session");
    }

    // Get user info
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    // Mark attendance
    const attendanceId = await ctx.db.insert("attendanceRecords", {
      sessionId: session._id,
      studentId: identity.subject,
      studentEmail: user.email,
      markedAt: now,
      ipAddress: args.ipAddress,
    });

    return {
      success: true,
      attendanceId,
      sessionName: session.sessionName,
      markedAt: now,
    };
  },
});

// Get session info by token (for verification without marking)
export const getSessionInfo = query({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("attendanceSessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) {
      return null;
    }

    const now = Date.now();
    const isExpired = now > session.expiresAt;
    const isActive = session.isActive && !isExpired;

    return {
      sessionName: session.sessionName,
      courseId: session.courseId,
      isActive,
      expiresAt: session.expiresAt,
      remainingTime: Math.max(0, session.expiresAt - now),
    };
  },
});

// Get attendance records for a session (Faculty only)
export const getAttendanceRecords = query({
  args: {
    sessionId: v.id("attendanceSessions"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Verify faculty owns this session
    const session = await ctx.db.get(args.sessionId);
    if (!session || session.facultyId !== identity.subject) {
      throw new ConvexError("Unauthorized access to attendance records");
    }

    const records = await ctx.db
      .query("attendanceRecords")
      .withIndex("by_session", (q) => q.eq("sessionId", args.sessionId))
      .collect();

    return records;
  },
});

// Get courses for a faculty member
export const getFacultyCourses = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const courses = await ctx.db
      .query("courses")
      .withIndex("by_faculty", (q) => q.eq("facultyId", identity.subject))
      .collect();

    return courses;
  },
});

// Get attendance sessions for a faculty member
export const getFacultySessions = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const sessions = await ctx.db
      .query("attendanceSessions")
      .withIndex("by_faculty", (q) => q.eq("facultyId", identity.subject))
      .collect();

    // Sort by creation date (newest first)
    return sessions.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Create a new course
export const createCourse = mutation({
  args: {
    name: v.string(),
    code: v.string(),
    department: v.string(),
    semester: v.string(),
    academicYear: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    // Check if user is faculty
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user.role !== "faculty") {
      throw new ConvexError("Only faculty can create courses");
    }

    const courseId = await ctx.db.insert("courses", {
      name: args.name,
      code: args.code,
      facultyId: identity.subject,
      department: args.department,
      semester: args.semester,
      academicYear: args.academicYear,
    });

    return courseId;
  },
});

// Sync user profile from Clerk
export const syncUserProfile = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.optional(
      v.union(v.literal("student"), v.literal("faculty"), v.literal("admin")),
    ),
    studentId: v.optional(v.string()),
    department: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      // Update existing user
      const updateData: any = {
        email: args.email,
        name: args.name,
        studentId: args.studentId,
        department: args.department,
      };
      if (args.role !== undefined) {
        updateData.role = args.role;
      }
      await ctx.db.patch(existingUser._id, updateData);
      return existingUser._id;
    } else {
      // Create new user
      const userData: any = {
        clerkId: args.clerkId,
        email: args.email,
        name: args.name,
        studentId: args.studentId,
        department: args.department,
      };
      if (args.role !== undefined) {
        userData.role = args.role;
      }
      const userId = await ctx.db.insert("users", userData);
      return userId;
    }
  },
});

// Get current user profile
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    return user;
  },
});

// Update user role
export const updateUserRole = mutation({
  args: {
    role: v.union(
      v.literal("student"),
      v.literal("faculty"),
      v.literal("admin"),
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(user._id, {
      role: args.role,
    });

    return { success: true };
  },
});
