import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "~/components/ui/toaster";

export const metadata: Metadata = {
  title: "Chat Diary",
  description:
    "｢ねえ聞いてよ、｣で充実した思い出を残そう。AIとのチャット形式で日記を作成するwebアプリです。",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${GeistSans.variable}`}>
      <body>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
