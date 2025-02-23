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


import { Doc, Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { NavigationContext } from "@/lib/NavigationProvider";
import { useContext } from "react";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

// 1) Import Day.js and its relativeTime plugin
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// (Optional) import or set your locale
import "dayjs/locale/en";

// 2) Extend Day.js with the relativeTime plugin
dayjs.extend(relativeTime);
// (Optional) set the locale globally
dayjs.locale("en");

function ChatRow({
  chat,
  onDelete,
}: {
  chat: Doc<"chats">;
  onDelete: (id: Id<"chats">) => void;
}) {
  const router = useRouter();
  const { closeMobileNav } = useContext(NavigationContext);
  const lastMessage = useQuery(api.messages.getLastMessage, {
    chatId: chat._id,
  });

  const handleClick = () => {
    router.push(`/dashboard/chat/${chat._id}`);
    closeMobileNav();
  };

  return (
    <div
      className="group rounded-xl border border-gray-200/30 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
      onClick={handleClick}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          Chat
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

        {/* 3) Use Day.js for “time ago” formatting */}
        {lastMessage?.createdAt && (
          <p className="text-xs text-gray-400 mt-1.5 font-medium">
            {dayjs(lastMessage.createdAt).fromNow()}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatRow;