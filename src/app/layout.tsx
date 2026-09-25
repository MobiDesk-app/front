import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RelayProvider } from "@/lib/relayContext";
import { ConnectionGate } from "@/components/ConnectionGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Home Relay",
  description: "View and control your home PC from the browser.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0d10] text-[#f2f4f8]">
        <RelayProvider>
          <ConnectionGate>{children}</ConnectionGate>
        </RelayProvider>
      </body>
    </html>
  );
}
