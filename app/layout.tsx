import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";

import { NavMenu } from "@/components/NavMenu";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { authConfig } from "@/auth.config";

export const metadata: Metadata = {
  title: "R&M",
  description: "Learning app",
  icons: "/icon.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session} basePath={authConfig.basePath}>
          <NavMenu />

          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
