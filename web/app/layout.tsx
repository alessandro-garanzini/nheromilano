import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FrameBorder from "@/components/FrameBorder";
import LoaderScreen from "@/components/LoaderScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nhero Milano | Bar, Ristorante, Bakery, Pizzeria",
  description: "Nel cuore di Milano, Nhero offre un'esperienza culinaria unica: bakery, ristorante, pizzeria e cocktail bar in un ambiente elegante e moderno.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <FrameBorder />
        <LoaderScreen />
        {children}
      </body>
    </html>
  );
}
