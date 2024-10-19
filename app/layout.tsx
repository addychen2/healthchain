import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { cn } from "@/utils";
import SideNav from "@/components/SideNav";


export const metadata: Metadata = {
  title: "APP TITLE",
  description: "AI DIETARY TRACKER",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "flex flex-col min-h-screens"
        )}
      >
          

        {children}
      </body>
    </html>
  );
}
