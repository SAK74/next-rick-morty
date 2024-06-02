"use client";

import type { FC, HTMLProps } from "react";
import { SubmitBtn } from "./SubmitButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const FormControl: FC<HTMLProps<"div">> = ({ className }) => {
  return (
    <div className={cn("flex justify-around", className)}>
      <SubmitBtn>Confirm</SubmitBtn>
      {/* <GoBackButton variant={"destructive"}>Cancel</GoBackButton> */}
      <Button type="reset" variant={"destructive"}>
        Reset
      </Button>
    </div>
  );
};
