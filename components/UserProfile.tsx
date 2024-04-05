import type { User } from "next-auth";
import type { FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export const UserProfile: FC<{ user?: User }> = ({ user }) => {
  const onLOgout = async () => {
    await signOut({ redirect: true, callbackUrl: "/example" });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={cn({ "cursor-pointer": user })}>
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>
            {(user?.name || user?.email || "?").slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent>
          <DropdownMenuItem onClick={onLOgout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};
