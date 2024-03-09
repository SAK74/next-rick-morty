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

const routes = [
  {
    name: "home",
    href: "/",
  },
  { name: "example", href: "/example" },
];

export const NavMenu = () => {
  const pathName = usePathname();
  return (
    <NavigationMenu
      className="bg-sky-400 p-4 w-full max-w-none justify-start
    "
    >
      <NavigationMenuList>
        {routes.map((route) => {
          // const href = route === "home" ? "/" : route;
          const isActive = pathName === route.href;
          return (
            <NextLink key={route.name} href={route.href} className="capitalize">
              {route.name}
            </NextLink>

            // <NavigationMenuItem key={route.name}>
            //   <NavigationMenuLink
            //     className={cn(navigationMenuTriggerStyle(), "capitalize")}
            //   >
            //     <NextLink href={route.href}>{route.name}</NextLink>
            //   </NavigationMenuLink>
            // </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
