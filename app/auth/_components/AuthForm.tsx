"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";
import { Socials } from "./Socials";
import { Separator } from "@/components/ui/separator";
import { CredentialsForm } from "./CredentialsForm";
import Link from "next/link";
import { FC } from "react";

export const AuthForm: FC<{ type: "login" | "register" }> = ({ type }) => {
  const router = useRouter();
  const onClickBack = () => {
    router.back();
  };

  return (
    <Card className="relative z-20 text-white bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] from-blue-300 to-sky-800">
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
        <CredentialsForm type={type} />
        <p className="text-primary mt-4">
          {type === "login" ? (
            <>
              {"Don't have account?"}
              <Button variant={"link"} asChild className="text-sky-900">
                <Link href={"/auth/register"}>Register here</Link>
              </Button>
            </>
          ) : (
            <>
              Have account?{" "}
              <Button variant={"link"} asChild>
                <Link href={"/auth/login"}>Login here</Link>
              </Button>
            </>
          )}
        </p>
        <Separator className="my-4" role="group" />
        <Socials />
      </CardContent>
    </Card>
  );
};
