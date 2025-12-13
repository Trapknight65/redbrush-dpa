import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Redbrush Digital Agency",
  description: "Creative digital solutions for modern brands",
  icons: {
    icon: '/favicon.ico',
  },
};

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EffectsWrapper from "@/components/EffectsWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen cursor-none`}
      >
        <div className="film-grain-overlay" />
        <EffectsWrapper />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
