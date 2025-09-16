import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Attendance sessions (created by faculty)
  attendanceSessions: defineTable({
    sessionName: v.string(), // e.g., "CS101 - Lecture 1"
    lectureId: v.id("lectures"), // Replaced courseId with lectureId
    facultyId: v.string(), // Clerk user ID of the faculty member
    isActive: v.boolean(), // Whether students can still mark attendance
    createdAt: v.number(),
    expiresAt: v.number(), // When this session expires
    token: v.string(), // Unique token for this session
  })
    .index("by_token", ["token"])
    .index("by_faculty", ["facultyId"]),

  // Individual attendance records
  attendanceRecords: defineTable({
    sessionId: v.id("attendanceSessions"),
    studentId: v.string(), // Clerk user ID of the student
    studentEmail: v.string(),
    markedAt: v.number(),
    ipAddress: v.optional(v.string()), // For additional fraud prevention
  })
    .index("by_session", ["sessionId"])
    .index("by_student_session", ["studentId", "sessionId"]),

  // User profiles (to store additional info)
  users: defineTable({
    clerkId: v.string(), // Clerk user ID
    email: v.string(),
    role: v.optional(
      v.union(v.literal("student"), v.literal("faculty"), v.literal("admin")),
    ),
    name: v.string(),
    studentId: v.optional(v.string()), // For students
    department: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),

  // Lectures for the faculty
  lectures: defineTable({
    name: v.string(),
    facultyId: v.string(), // Clerk user ID of the faculty member
    createdAt: v.number(),
  }).index("by_faculty", ["facultyId"]),

});
