"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Disc3Icon } from "lucide-react";
import { UserProfile } from "./UserProfile";

const routes = [
  {
    name: "home",
    href: "/",
  },
  { name: "favorites", href: "/favorites" },
  { name: "example", href: "/example" },
];

export const NavMenu = () => {
  const pathName = usePathname();
  const { data, status } = useSession();
  // console.log("Session in nav bar", data);

  return (
    <NavigationMenu
      className="bg-sky-400/60 p-4 w-full max-w-none justify-between sticky top-0 backdrop-blur-sm shadow-md
    "
    >
      <NavigationMenuList>
        {routes.map((route) => {
          const isActive = pathName === route.href;
          return (
            <NavigationMenuItem key={route.name}>
              <NavigationMenuLink
                asChild
                className={cn(navigationMenuTriggerStyle(), "capitalize")}
              >
                <NextLink
                  className={cn({ "bg-transparent": !isActive })}
                  href={route.href}
                >
                  {route.name}
                </NextLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
      {status === "loading" ? (
        <Disc3Icon color="black" className="animate-spin" />
      ) : status === "authenticated" ? (
        // <Link href={"/nextauth/signout"}>Logout</Link>
        <UserProfile user={data.user} />
      ) : (
        // <Link href="/nextauth/signin">Login</Link>
        <UserProfile />
      )}
    </NavigationMenu>
  );
};
