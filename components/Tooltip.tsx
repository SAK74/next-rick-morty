import { FC, PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

export const MyTooltip: FC<
  PropsWithChildren<{ text: string; className?: string }>
> = ({ children, text, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer hover:scale-110">
          {children}
        </TooltipTrigger>
        <TooltipContent className={cn("bg-sky-100", className)}>
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
