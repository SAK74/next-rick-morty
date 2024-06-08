import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "../../../components/ui/button";
import { Socials } from "./Socials";
import { Separator } from "@/components/ui/separator";
import { CredentialsForm } from "./CredentialsForm";
import Link from "next/link";
import type { FC } from "react";
import { SetupForm } from "./SetupForm1";
import { GoBackButton } from "@/components/GoBackButton";

export type AuthFormType = "login" | "register";

export const AuthForm: FC<{ type: AuthFormType | "setup" }> = ({ type }) => {
  return (
    <Card className="w-80 relative z-20 text-white bg-[radial-gradient(ellipse,_var(--tw-gradient-stops))] from-blue-300 to-sky-800">
      <CardHeader className="text-center">
        <GoBackButton variant={"link"} className="self-start text-sky-300">
          ⬅ Go back
        </GoBackButton>
        {
          {
            login: "Welcome back!",
            register: "Register account!",
            setup: "🔑 Setup",
          }[type]
        }
      </CardHeader>
      <CardContent>
        {type === "setup" ? (
          <SetupForm />
        ) : (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};
