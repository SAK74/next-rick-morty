import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export const Socials = () => {
  const searchParams = useSearchParams();
  const callBack = searchParams.get("callbackUrl");
  const onClick = (type: "github" | "google") => {
    signIn(type, {
      redirect: Boolean(callBack),
      ...(callBack && { callbackUrl: callBack }),
    });
  };
  return (
    <div className="flex flex-col gap-2 w-9/12 mx-auto text-center">
      <p>Or login with provider</p>
      <Button
        className="bg-black space-x-4"
        size={"lg"}
        onClick={() => {
          onClick("github");
        }}
      >
        <FaGithub size={"2rem"} />
        <span>Github</span>
      </Button>
      <Button
        className="space-x-4 text-black"
        variant={"outline"}
        size={"lg"}
        onClick={() => {
          onClick("google");
        }}
      >
        <FcGoogle size={"2rem"} />
        <span>Google</span>
      </Button>
    </div>
  );
};
