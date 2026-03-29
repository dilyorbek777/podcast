import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    username: v.optional(v.string()),
    role: v.string(),
    profileImage: v.optional(v.string()),
    createdAt: v.optional(v.number()),
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
  newsletter: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }).index("by_email", ["email"]),
  contacts: defineTable({
    name: v.string(),
    family: v.string(),
    phone: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
});
