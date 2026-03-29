import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const ADMIN_EMAILS = [
  "dilyorbekdev@email.com",
  "asfandiyorovdilyorbek@email.com",
];


export const getUserByClerkId = query({
  args: { clerkId: v.string() },

  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    return user;
  },
});
export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users;
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    username: v.optional(v.string()),
    profileImage: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) return;

    const role = ADMIN_EMAILS.includes(args.email) ? "admin" : "user";

    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      fullName: args.fullName,
      username: args.username,
      profileImage: args.profileImage,
      role,
      createdAt: Date.now(),
    });
  },
});
