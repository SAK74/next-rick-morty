"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Disc3Icon } from "lucide-react";
import type { FC, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

export const SubmitBtn: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  const { pending } = useFormStatus();
  return (
    <Button {...props} disabled={pending}>
      {children}
      {pending && (
        <>
          &nbsp;
          <Disc3Icon className="animate-spin" />
        </>
      )}
    </Button>
  );
};
