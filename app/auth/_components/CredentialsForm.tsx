"use client";

import type { FC } from "react";
import { Input } from "../../../components/ui/input";
import { useSearchParams } from "next/navigation";
import { ShowMessage } from "@/components/ShowMessage";
import { useFormState } from "react-dom";
import { login, register } from "@/actions/userAuth";
import { UserCredentials } from "@/types";
import { cn } from "@/lib/utils";
import { SubmitBtn } from "./SubmitButton";

export type FormStateType<T = UserCredentials> =
  | {
      status: "ok";
      message: string;
    }
  | { status: "error"; message: string | { [k in keyof T]?: string[] } }
  | null;

export const CredentialsForm: FC<{ type: "login" | "register" }> = ({
  type,
}) => {
  const searchParams = useSearchParams();
  const callBackURL = searchParams.get("callbackUrl");
  const authError = searchParams.get("error");

  const [formState, formAction] = useFormState<
    FormStateType<UserCredentials & { passwVeryfication?: string }>,
    FormData
  >(
    type === "login" ? login.bind(null, callBackURL) : register,
    authError ? { status: "error", message: authError } : null
  );

  const emailError =
    formState?.status === "error" &&
    typeof formState.message !== "string" &&
    formState.message.email
      ? formState.message.email[0]
      : undefined;

  const passwordError =
    formState?.status === "error" &&
    typeof formState.message !== "string" &&
    formState.message.password
      ? formState.message.password[0]
      : undefined;

  const passwordVeryficError =
    formState?.status === "error" &&
    typeof formState.message !== "string" &&
    formState.message.passwVeryfication
      ? formState.message.passwVeryfication[0]
      : undefined;

  return (
    <form action={formAction} className="flex flex-col items-start gap-4">
      <label>
        Your email:
        <Input
          name="email"
          placeholder="john@kowalski.com"
          className={cn(
            { "border-2 border-destructive": emailError },
            "text-gray-900"
          )}
        />
        {emailError && <div className="text-destructive">{emailError}</div>}
      </label>
      <label>
        Password:
        <Input
          name="password"
          placeholder="12345"
          type="password"
          className={cn(
            { "border-2 border-destructive": passwordError },
            "text-gray-900"
          )}
        />
        {passwordError && (
          <div className="text-destructive">{passwordError}</div>
        )}
      </label>
      {type === "register" && (
        <label>
          Confirm password:{" "}
          <Input
            name="passw-veryfication"
            placeholder="12345"
            type="password"
            className={cn(
              { "border-2 border-destructive": passwordVeryficError },
              "text-gray-900"
            )}
          />
          {passwordVeryficError && (
            <div className="text-destructive">{passwordVeryficError}</div>
          )}
        </label>
      )}
      <SubmitBtn type="submit" className="self-center">
        {type === "login" ? "Login" : "Register"}
      </SubmitBtn>

      {formState && (
        <ShowMessage
          type={formState.status === "ok" ? "success" : "error"}
          message={
            typeof formState.message === "string"
              ? formState.message
              : "Wrong credentials"
          }
        />
      )}
    </form>
  );
};
