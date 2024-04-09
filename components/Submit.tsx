"use client";

import { Disc3Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Disc3Icon className="animate-spin inline" />
  ) : (
    <input type="submit" className="cursor-pointer" />
  );
};
