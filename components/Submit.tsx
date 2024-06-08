"use client";

import { Disc3Icon } from "lucide-react";
import { FC, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export const SubmitBtn: FC<PropsWithChildren> = ({ children }) => {
  const { pending } = useFormStatus();
  return pending ? (
    <Disc3Icon className="animate-spin inline" />
  ) : (
    <Button>{children}</Button>
  );
};
