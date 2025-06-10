'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { LoadingProvider } from "@/components/LoadingProvider";
import { TelegramWebAppProvider } from "@/components/TelegramWebAppProvider";
import StoreProvider from "@/redux/StoreProvider";
import { useEffect } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#ffffff" />
        <title>Cryptus Exchange</title>
        <meta name="description" content="Cryptus Exchange - Telegram Mini App" />
      </head>
      <body className={`${inter.variable} antialiased flex flex-col h-screen`}>
        <StoreProvider>
          <TelegramWebAppProvider>
            <Header></Header>
            <LoadingProvider>
              <main className="pb-35 flex-grow overflow-x-hidden h-full">
                {children}
              </main>
            </LoadingProvider>
          </TelegramWebAppProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
