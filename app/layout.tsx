import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";

import { NavMenu } from "@/components/NavMenu";

export const metadata: Metadata = {
  title: "R&M",
  description: "Learning app",
  icons: "/icons8-rick-sanchez-16.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavMenu />
        {children}
      </body>
    </html>
  );
}
