"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { FC, PropsWithChildren } from "react";

export const GoBackButton: FC<PropsWithChildren<ButtonProps>> = ({
  children,
  ...props
}) => {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };
  return (
    <Button onClick={onClickBack} {...props} type="button">
      {children}
    </Button>
  );
};
