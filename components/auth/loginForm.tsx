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

export type FormStateType = {
  status: "ok" | "error";
  message: string;
} | null;

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

  const [formState, formAction] = useFormState<FormStateType, FormData>(
    type === "login" ? login : register,
    null
  );

  return (
    <Card className="w-[500px] relative z-20 text-white bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] from-blue-300 to-sky-800">
      <CardHeader className="text-center">
        <Button
          variant={"link"}
          className="self-start text-sky-300"
          onClick={onClickBack}
          color="blue"
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
              className="text-gray-900"
            />
          </label>
          <label>
            Password:
            <Input
              name="password"
              placeholder="12345"
              className="text-gray-900"
            />
          </label>
          <Button type="submit" className="self-center w-1/4">
            {type === "login" ? "Login" : "Register"}
          </Button>
          {error && <ShowMessage type="error" message={error} />}
          {formState && (
            <ShowMessage
              type={formState.status === "ok" ? "success" : "error"}
            />
          )}
        </form>
        <Separator className="my-4" role="group" />
        <Socials />
      </CardContent>
    </Card>
  );
};
