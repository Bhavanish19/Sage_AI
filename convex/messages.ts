import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
      .order("asc") // Ensure sorting works as expected
      .collect();

    return messages;
  },
});

export const send = mutation({
    args: {
        chatId: v.id("chats"),
        content: v.string(),
        role: v.union(v.literal("user"), v.literal("assistant")),
    },
    handler: async (ctx, args) => {
        const messageId = await ctx.db.insert("messages", {
            chatId: args.chatId,
            content: args.content
            .replace(/\n/g, "\\n")

            .replace(/\\/g, "\\\\"),
            role: args.role,
            createdAt: Date.now(),
        });

        return messageId;
    },
});

export const getLastMessage = query({
    args: { chatId: v.id("chats") },
    handler: async (ctx, args) => {
      // Get authenticated user
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) {
        throw new Error("Not authenticated");
      }
  
      // Fetch chat to verify user ownership
      const chat = await ctx.db.get(args.chatId);
      if (!chat) {
        throw new Error("Chat not found");
      }
      
      if (chat.userId !== identity.subject) {
        throw new Error("Unauthorized");
      }
  
      // Retrieve the last message in the chat
      const lastMessage = await ctx.db
        .query("messages")
        .withIndex("by_chat", (q) => q.eq("chatId", args.chatId))
        .order("desc") // Get the latest message
        .first(); // Get only the first result
  
      return lastMessage;
    },
  });