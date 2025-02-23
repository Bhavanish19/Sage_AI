import { Id } from '@/convex/_generated/dataModel';
import { getConvexClient } from '@/lib/convex';
import { api } from '@/convex/_generated/api';
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ChatInterface from '@/components/ChatInterface';

interface PageProps {
  params: {
    chatId: string;  // Next.js route params are always strings
  };
}

export default async function ChatPage({ params }: PageProps) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  try {
    // Convert string to Id<"chats"> type
    const chatId = params.chatId as Id<"chats">;
    
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



// import { Id } from '@/convex/_generated/dataModel';
// import { getConvexClient } from '@/lib/convex';
// import { api } from '@/convex/_generated/api';
// import { auth } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import ChatInterface from '@/components/ChatInterface';

// interface ChatPageProps {
//   params: {
//     chatId: Id<"chats">;
//   };
// }

// async function ChatPage({ params }: ChatPageProps) {
//   // Ensure params is handled correctly
//   const chatId = params?.chatId;

//   // Get user authentication
//   const { userId } = await auth();

//   if (!userId) {
//     redirect("/");
//   }

//   try {
//     const convex = getConvexClient();
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

// export default ChatPage;

