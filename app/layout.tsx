import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Background } from "@/components/brand/background";
import { StoreProvider } from "@/lib/store";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "VibeNet — The event industry, connected.",
  description: "VibeNet is where organisers, venues, artists and vendors discover each other, collaborate and grow.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="relative min-h-screen bg-base font-sans text-text-primary antialiased">
        <Background />
        <StoreProvider>
          <div className="relative z-10">{children}</div>
        </StoreProvider>
      </body>
    </html>
  );
}