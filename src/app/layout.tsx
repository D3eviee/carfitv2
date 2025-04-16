import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Carfit App",
  description: "Book your car service provider",
};

export default  function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-[#FDFCFF]`}>
        <QueryProvider>
        <ReactQueryDevtools position="bottom" buttonPosition="bottom-right"/>
        {children}
        </QueryProvider>
      </body>
    </html>
  );
}


