import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createEpisode = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    videoUrl: v.string(),
    posterUrl: v.string(),
    category: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("episodes", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getEpisodes = query({
  handler: async (ctx) => {
    return await ctx.db.query("episodes").collect();
  },
});
export const deleteEpisode = mutation({
  args: { id: v.id("episodes") },

  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const getEpisode = query({
  args: {
    id: v.id("episodes"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateEpisode = mutation({
  args: {
    id: v.id("episodes"),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    videoUrl: v.string(),
    posterUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...updateData } = args;
    await ctx.db.patch(id, updateData);
  },
});
