import type { User } from "next-auth";
import { useState, type FC } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import {
  LogOutIcon,
  UserRoundPlusIcon,
  UserRoundXIcon,
  InfoIcon,
  SettingsIcon,
} from "lucide-react";
import Link from "next/link";
import { deleteUser } from "@/actions/deleteUser";
import { REDIRECT_AFTER_LOGOUT } from "@/routes";
import { MyTooltip } from "./Tooltip";
import { DeleteAccountDialog } from "./DeleteAccountDialog";

export const UserProfile: FC<{ user?: User }> = ({ user }) => {
  const onLogout = async () => {
    await signOut({
      redirect: Boolean(REDIRECT_AFTER_LOGOUT),
      callbackUrl: REDIRECT_AFTER_LOGOUT,
    });
  };
  const onDelete = async () => {
    if (!user?.id) {
      console.log("ID not provided");
      return;
    }
    await deleteUser(user.id);
    await onLogout();
  };

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
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
            <>
              <DropdownMenuLabel>{user.name || user.email}</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={"auth/setup"}>
                  <SettingsIcon />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <LogOutIcon />
                <span>Logout</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <UserRoundXIcon />
                <span>Delete account</span>
              </DropdownMenuItem>
            </>
          ) : (
            <DropdownMenuItem asChild>
              <Link href={"/auth/register"}>
                <UserRoundPlusIcon />
                <span>Register</span>
                <MyTooltip
                  className="w-min mr-8"
                  text="Provided credentials are only for demonstration type (e-mail may be faked). This data aren't in anyway processed nor passed to third parts."
                >
                  <InfoIcon className="opacity-50" />
                </MyTooltip>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteAccountDialog
        isOpen={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
        onSubmit={onDelete}
      />
    </>
  );
};
