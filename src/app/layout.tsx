import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import Header from "@/components/Header";
import { LoadingProvider } from "@/components/LoadingProvider";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  title: "Cryptus Exchange",
  description: "Cryptus Exchange - Telegram Mini App",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} antialiased flex flex-col h-screen`}>
        <StoreProvider>
          <Header></Header>
          <LoadingProvider>
            <main className="pb-35 flex-grow overflow-x-hidden h-full">{children}</main>
          </LoadingProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
