// import { Doc, Id } from "@/convex/_generated/dataModel";
// import { useRouter } from "next/navigation";
// import { NavigationContext } from "@/lib/NavigationProvider";
// import { useContext } from "react";
// import { Button } from "./ui/button";
// import { TrashIcon } from "lucide-react";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";


// function ChatRow({
//   chat,
//   onDelete,
// }: {
//   chat: Doc<"chats">;
//   onDelete: (id: Id<"chats">) => void;
// }) {
//   const router = useRouter();
//   const { closeMobileNav } = useContext(NavigationContext);
//   const lastMessage = useQuery(api.messages.getLastMessage, {
//     chatId: chat._id,
//   });

//   const handleClick = () => {
//     router.push(`/dashboard/chat/${chat._id}`);
//     closeMobileNav();
//   };

//   return (
//     <div
//       className="group rounded-xl border border-gray-200/30 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
//       onClick={handleClick}
//     >
//       <div className="p-4">
//         <div className="flex justify-between items-start">
//           Chat
//           <Button
//             variant="ghost"
//             size="icon"
//             className="opacity-0 group-hover:opacity-100 -mr-2 -mt-2 ml-2 transition-opacity duration-200"
//             onClick={(e) => {
//               e.stopPropagation();
//               onDelete(chat._id);
//             }}
//           >
//             <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
//           </Button>
//         </div>

//         {lastMessage && lastMessage.createdAt && (
//           <p className="text-xs text-gray-400 mt-1.5 font-medium">
//               <ReactTimeAgo date={new Date(lastMessage.createdAt)} locale="en-US" />
//           </p>
//         )} 

//       </div>
//     </div>
//   );
// }

// export default ChatRow;

// import { Doc, Id } from "@/convex/_generated/dataModel";
// import { useRouter } from "next/navigation";
// import { NavigationContext } from "@/lib/NavigationProvider";
// import { use } from "react";
// import { Button } from "./ui/button";
// import { TrashIcon } from "lucide-react";
// import { useContext } from "react";
// import { LastValue } from "@langchain/langgraph";
// import { useQuery } from "convex/react";
// import { api } from "@/convex/_generated/api";

// import TimeAgo from "react-timeago";

// function ChatRow({ chat, onDelete, }: 
//     {
//         chat: Doc<"chats">;
//         onDelete: (id: Id<"chats">) => void;
//     }) {
//         const router = useRouter();
//         const { closeMobileNav } = use(NavigationContext);
//         const lastMessage = useQuery(api.messages.getLastMessage, {
//             chatId: chat._id,
//         });

//         const handleClick = () => {
//             router.push(`/dashboard/chat/${chat._id}`);
//             closeMobileNav();
//         };

//         return (
//             <div
//               className="group rounded-xl border border-gray-200/30 bg-white/50 backdrop-blur-sm hover:bg-white/80 
//                          transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
//               onClick={handleClick}
//             >
//               <div className="p-4">
//                 <div className="flex justify-between items-start"> 
//                     chat

//                     <Button
//                         variant="ghost"
//                         size="icon"
//                         className="opacity-0 group-hover:opacity-100 -mr-2 -mt-2 ml-2 transition-opacity duration-200"
//                         onClick={(e) => {
//                             e.stopPropagation();
//                             onDelete(chat._id);
//                         }}
//                     >
//                         <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
//                     </Button>
//                 </div>
//                 {
//                   lastMessage && (
//                     <p className="text-x5 text-gray-400 mt 1.5 font-medium">
//                       <TimeAgo date={lastMessage.createdAt} />
//                     </p>
//                 }
//               </div>
//             </div>
//           );
//         }

// export default ChatRow;





import { Doc, Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { NavigationContext } from "@/lib/NavigationProvider";
import { useContext } from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// ✅ Import react-time-ago (React 19 compatible)
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

// ✅ Initialize locale for time formatting
TimeAgo.addDefaultLocale(en);

interface ChatRowProps {
  chat: Doc<"chats">;
  onDelete: (id: Id<"chats">) => void;
}

const ChatRow: React.FC<ChatRowProps> = ({ chat, onDelete }) => {
  const router = useRouter();
  const { closeMobileNav } = useContext(NavigationContext); // ✅ Fixed `useContext`
  const lastMessage = useQuery(api.messages.getLastMessage, {
    chatId: chat._id,
  });

  const handleClick = () => {
    router.push(`/dashboard/chat/${chat._id}`);
    closeMobileNav();
  };

  return (
    <div
      className="group rounded-xl border border-gray-200/30 bg-white/50 backdrop-blur-sm hover:bg-white/80 
                 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <span>Chat</span>

          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 -mr-2 -mt-2 ml-2 transition-opacity duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(chat._id);
            }}
          >
            <TrashIcon className="h-4 w-4 text-gray-400 hover:text-red-500 transition-colors" />
          </Button>
        </div>

        {/* ✅ Ensure lastMessage is available before rendering */}
        {lastMessage?.createdAt && (
          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            <ReactTimeAgo date={new Date(lastMessage.createdAt)} locale="en-US" />
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatRow;
