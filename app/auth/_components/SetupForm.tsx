"use client";

import { useSession } from "next-auth/react";

import { userSetupAction } from "@/actions/userSetup";
import { Input } from "@/components/ui/input";
import { FormControl } from "./FormControl";
import { useFormState } from "react-dom";
import { FormStateType, UserCredentials } from "@/types";
import { ShowMessage } from "@/components/ShowMessage";
import { useEffect, useRef } from "react";

export const SetupForm = () => {
  const { data, status, update: sessionUpdate } = useSession();

  const [formState, action] = useFormState<
    FormStateType<UserCredentials & { name: string; newPassw?: string }>,
    FormData
  >(userSetupAction, null);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formState?.status === "ok") {
      sessionUpdate();
      formRef.current?.reset();
    }
  }, [formState]); //eslint-disable-line

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

  if (!data) {
    return null;
  }
  const { user } = data;
  return (
    <form action={action} className="flex flex-col gap-2" ref={formRef}>
      <label>
        Name:{" "}
        <span className="text-emerald-700 text-lg font-medium">
          {user?.name}
        </span>
        <Input
          name="name"
          className="text-gray-800"
          placeholder="Enter new name"
        />
      </label>
      <label>
        E-mail:{" "}
        <span className="text-emerald-700 text-lg font-medium">
          {user?.email}
        </span>
        {!user.isOauth && (
          <>
            <Input
              name="email"
              className="text-gray-800"
              placeholder="Enter new e-mail"
            />
            {emailError && <div className="text-destructive">{emailError}</div>}
          </>
        )}
      </label>
      {!user.isOauth && (
        <>
          <label>
            Password:{" "}
            <Input
              name="password"
              className="text-gray-800"
              type="password"
              placeholder="Your current password"
            />
            {passwordError && (
              <div className="text-destructive">{passwordError}</div>
            )}
          </label>
          <label>
            New password:{" "}
            <Input
              name="new-password"
              className="text-gray-800"
              placeholder="Password to change for"
              type="password"
            />
          </label>
        </>
      )}

      {formState && (
        <ShowMessage
          type={formState.status === "ok" ? "success" : "error"}
          message={
            typeof formState.message === "string"
              ? formState.message
              : "Wrong form data!"
          }
        />
      )}
      <FormControl className="mt-4" />
    </form>
  );
};
