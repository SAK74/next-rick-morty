import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/ui/fonts";
import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { NavMenu } from "@/components/NavMenu";

export const metadata: Metadata = {
  title: "R&M",
  description: "Learning app",
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
