"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FC } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Socials } from "./Socials";
import { ShowMessage } from "../ShowMessage";
import { useFormState } from "react-dom";
import { login, register } from "@/actions/userAuth";
import { Separator } from "@/components/ui/separator";
import { UserCredentials } from "@/types";
import { cn } from "@/lib/utils";

export type FormStateType<T = UserCredentials> =
  | {
      status: "ok";
      message: string;
    }
  | { status: "error"; message: string | { [k in keyof T]?: string[] } }
  | null;

export const LoginForm: FC<{ type: "login" | "register"; error?: string }> = ({
  type,
  error,
}) => {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };

  const searchParams = useSearchParams();
  const callBack = searchParams.get("callbackUrl");

  const [formState, formAction] = useFormState<
    FormStateType<UserCredentials>,
    FormData
  >(type === "login" ? login : register, null);

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

  return (
    <Card className="w-[500px] relative z-20 text-white bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] from-blue-300 to-sky-800">
      <CardHeader className="text-center">
        <Button
          variant={"link"}
          className="self-start text-sky-300"
          onClick={onClickBack}
        >
          ⬅ Go back
        </Button>
        {type === "login" ? "Welcome back!" : "Register account!"}
      </CardHeader>
      <CardContent>
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
              className={cn(
                { "border-2 border-destructive": passwordError },
                "text-gray-900"
              )}
            />
            {passwordError && (
              <div className="text-destructive">{passwordError}</div>
            )}
          </label>
          <Button type="submit" className="self-center w-1/4">
            {type === "login" ? "Login" : "Register"}
          </Button>
          {error && <ShowMessage type="error" message={error} />}
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
        <Separator className="my-4" role="group" />
        <Socials />
      </CardContent>
    </Card>
  );
};
