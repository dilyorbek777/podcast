import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const subscribe = mutation({
  args: {
    email: v.string(),
    subscribedAt: v.number(),
  },
  handler: async (ctx, args) => {
    const newsletterId = await ctx.db.insert("newsletter", {
      email: args.email,
      subscribedAt: args.subscribedAt,
    });
    return newsletterId;
  },
});

export const getByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("newsletter")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    return subscription;
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const subscriptions = await ctx.db.query("newsletter").collect();
    return subscriptions.sort((a, b) => b.subscribedAt - a.subscribedAt);
  },
});

export const deleteSubscription = mutation({
  args: {
    id: v.id("newsletter"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
