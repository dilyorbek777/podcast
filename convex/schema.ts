import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
    role: v.string(),
  }).index("by_clerkId", ["clerkId"]),

  blogs: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    createdAt: v.number(),
    category: v.string(),
  }),
  episodes: defineTable({
    title: v.string(),
    description: v.string(),
    videoUrl: v.string(),
    posterUrl: v.string(),
    category: v.string(),
    createdAt: v.number(),
  }),
});
