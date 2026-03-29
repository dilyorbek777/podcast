import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createContact = mutation({
  args: {
    name: v.string(),
    family: v.string(),
    phone: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const timestamp = Date.now();
    await ctx.db.insert("contacts", {
      name: args.name,
      family: args.family,
      phone: args.phone,
      message: args.message,
      createdAt: timestamp,
    });
  },
});

export const getContacts = query({
  handler: async (ctx) => {
    const contacts = await ctx.db.query("contacts").order("desc").collect();
    return contacts;
  },
});

export const deleteContact = mutation({
  args: {
    id: v.id("contacts"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
