import { FC, PropsWithChildren } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const MyTooltip: FC<PropsWithChildren<{ text: string }>> = ({
  children,
  text,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-sky-100">{text}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
