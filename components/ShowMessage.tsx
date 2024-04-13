import { cn } from "@/lib/utils";
import { CircleCheckBigIcon, CircleXIcon } from "lucide-react";
import { FC } from "react";

export const ShowMessage: FC<{
  type: "success" | "error";
  message?: string;
}> = ({ type, message = "" }) => (
  <div
    className={cn("flex gap-4", {
      "text-emerald-700": type === "success",
      "text-destructive": type === "error",
    })}
  >
    {type === "success" && <CircleCheckBigIcon />}
    {type === "error" && <CircleXIcon />}
    <span>{message}</span>
  </div>
);
