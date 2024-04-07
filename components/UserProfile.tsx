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
import { LogOutIcon, UserRoundPlusIcon } from "lucide-react";
import Link from "next/link";

export const UserProfile: FC<{ user?: User }> = ({ user }) => {
  const onLOgout = async () => {
    await signOut({ redirect: true, callbackUrl: "/example" });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user?.image || undefined} />
          <AvatarFallback>
            {(user?.name || user?.email || "?").slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <DropdownMenuItem onClick={onLOgout}>
            <LogOutIcon />
            <span>Logout</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <UserRoundPlusIcon />
            <Link href={"/auth/register"}>Register</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
