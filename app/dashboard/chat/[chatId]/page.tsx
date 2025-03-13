// import ChatInterface from "@/components/ChatInterface";
// import { Id } from "@/convex/_generated/dataModel";
// import { api } from "@/convex/_generated/api";
// import { getConvexClient } from "@/lib/convex";
// import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs/server";

// // Update interface to handle Next.js App Router's async params
// interface ChatPageProps {
//   params: Promise<{ chatId: string }> | { chatId: string };
// }

// export default async function ChatPage({ params }: ChatPageProps) {
//   // Resolve params and convert chatId to Convex ID type
//   const resolvedParams = await Promise.resolve(params);
//   const chatId = resolvedParams.chatId as unknown as Id<"chats">;

//   // Get user authentication
//   const { userId } = await auth();

//   if (!userId) {
//     redirect("/");
//   }

//   try {
//     // Get Convex client and fetch chat and messages
//     const convex = getConvexClient();

//     // Check if chat exists & user is authorized to view it
//     const chat = await convex.query(api.chats.getChat, {
//       id: chatId,
//       userId,
//     });

//     if (!chat) {
//       console.log(
//         "⚠️ Chat not found or unauthorized, redirecting to dashboard"
//       );
//       redirect("/dashboard");
//     }

//     // Get messages
//     const initialMessages = await convex.query(api.messages.list, { chatId });

//     return (
//       <div className="flex-1 overflow-hidden">
//         <ChatInterface chatId={chatId} initialMessages={initialMessages} />
//       </div>
//     );
//   } catch (error) {
//     console.error("🔥 Error loading chat:", error);
//     redirect("/dashboard");
//   }
// }


import { Id } from '@/convex/_generated/dataModel';
import { getConvexClient } from '@/lib/convex';
import { api } from '@/convex/_generated/api';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from '@/components/ChatInterface';

// Use the generated types from your Next.js project
import { PageProps } from "@/.next/types/app/dashboard/chat/[chatId]/page";

export default async function ChatPage(props: PageProps) {
  // Ensure params exists and handle properly
  if (!props.params) {
    redirect("/dashboard");
    return null;
  }
  
  // Resolve params if it's a Promise
  const resolvedParams = await Promise.resolve(props.params);
  
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  try {
    // Safely access chatId after resolving params
    const chatId = resolvedParams.chatId as Id<"chats">;
    
    const convex = getConvexClient();
    const initialMessages = await convex.query(api.messages.list, { chatId });

    return (
      <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={chatId} initialMessages={initialMessages} />
      </div>
    );
  } catch (error) {
    console.error("🔥 Error loading chat:", error);
    redirect("/dashboard");
  }
}