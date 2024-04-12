"use client";

import { register } from "@/actions/registerUser";
import { SubmitBtn } from "@/components/Submit";
import { cn } from "@/lib/utils";
import { useFormState } from "react-dom";

export type FormStateType = {
  status: "ok" | "error";
  message: string;
} | null;

export default function RegisterPage() {
  const [formState, registerAction] = useFormState<FormStateType, FormData>(
    register,
    null
  );
  return (
    <>
      <form action={registerAction}>
        <label>
          E-mail:{" "}
          <input type="email" name="email" placeholder="John Kowalski" />
        </label>
        <label>
          Password:{" "}
          <input type="password" name="password" placeholder="12345" />
        </label>
        {/* <input type="submit" /> */}
        <SubmitBtn>
          <input type="submit" value="Confirm" />
        </SubmitBtn>
      </form>
      {formState && (
        <p
          className={cn({
            "text-destructive": formState.status === "error",
            "text-emerald-600": formState.status === "ok",
          })}
        >
          {formState.message}
        </p>
      )}
    </>
  );
}
