import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DenAI — Fight Your Insurance Denial",
  description:
    "80% of insurance appeals win. Almost nobody files. DenAI turns your denial letter into a complete appeal in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-slate-900">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
