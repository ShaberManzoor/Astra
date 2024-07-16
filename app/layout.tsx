import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ChatProvider } from "@/context/ChatContext";
import { ClerkProvider } from "@clerk/nextjs";
import { SidebarProvider } from "@/context/SidebarContext";

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Astra",
  description: "Build with Gemini",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
          <ClerkProvider>
            <SidebarProvider>
              <ChatProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
                    {children}
                </ThemeProvider>
              </ChatProvider>
            </SidebarProvider>
          </ClerkProvider>
      </body>
    </html>
  );
}
