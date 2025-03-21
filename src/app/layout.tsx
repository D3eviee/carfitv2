import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QueryProvider } from "@/components/providers/query-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carfit App",
  description: "Book your car service provider",
};

export default  function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FDFCFF]`}>
        <QueryProvider>
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}


