import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createBlog = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    imageUrl: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("blogs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});
export const getBlogs = query({
  handler: async (ctx) => {
    return await ctx.db.query("blogs").collect();
  },
});
export const deleteBlog = mutation({
  args: { id: v.optional(v.id("blogs")) },

  handler: async (ctx, args) => {
    if (!args.id) return;
    await ctx.db.delete(args.id);
  },
});




export const getBlog = query({
  args: { id: v.id("blogs") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});