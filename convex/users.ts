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
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    username: v.optional(v.string()),
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
      username: args.username,
      role,
    });
  },
});
