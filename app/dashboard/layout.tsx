"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";
import { NavigationProvider } from "@/lib/NavigationProvider";
import { Authenticated } from "convex/react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <NavigationProvider>
        <div>
            <Authenticated>
                <Sidebar />
            </Authenticated>
            <main>
                <Header/>
                {children}</main>
        </div>
        </NavigationProvider>
    );
}

// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// // import "./globals.css";  
// import { ConvexClientProvider } from "@/components/ConvexClientProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "AI Chat App",
//   description: "A modern chat application built with Next.js and Convex",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <ConvexClientProvider>
//       <html lang="en">
//         <body
//           className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         >
//           {children}
//         </body>
//       </html>
//     </ConvexClientProvider>
//   );
// }