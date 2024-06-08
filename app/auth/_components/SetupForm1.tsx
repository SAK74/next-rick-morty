"use client";

import { userSetupAction } from "@/actions/userSetup1";
import { ShowMessage } from "@/components/ShowMessage";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { oauthUserSetupSchema, userSetupSchema } from "@/schemas";
import type { UserSetupForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Disc3Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

export const SetupForm = () => {
  const { data, status, update } = useSession();
  const form = useForm<UserSetupForm>({
    resolver: zodResolver(
      data?.user.isOauth ? oauthUserSetupSchema : userSetupSchema
    ),
    defaultValues: { name: "", email: "", password: "", newPassw: "" },
  });

  const [statusMessage, setStatusMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const onValid: SubmitHandler<UserSetupForm> = async (data) => {
    if (!data.name && !data.email && !data.newPassw) {
      form.setError("root", {
        type: "custom",
        message: "Nothing to change...!",
      });
      return;
    }
    const result = await userSetupAction(data);

    setStatusMessage({
      type: result.status === "ok" ? "success" : "error",
      message: result.message,
    });
    if (result.status === "ok") {
      form.reset();
      update();
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name:{" "}
                {status === "loading" ? (
                  <Disc3Icon className="animate-spin inline" />
                ) : (
                  <span className="text-emerald-700 text-lg font-medium">
                    {data?.user.name}
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter new name"
                  className="text-gray-800"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {data?.user.isOauth && (
          <FormLabel>
            E-mail: {/* @ts-ignore */}
            {status === "loading" ? (
              <Disc3Icon className="animate-spin inline" />
            ) : (
              <span className="text-emerald-700 text-lg font-medium">
                {data?.user.email}
              </span>
            )}
          </FormLabel>
        )}
        {!data?.user.isOauth && (
          <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    E-mail:{" "}
                    {status === "loading" ? (
                      <Disc3Icon className="animate-spin inline" />
                    ) : (
                      <span className="text-emerald-700 text-lg font-medium">
                        {data?.user.email}
                      </span>
                    )}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter new e-mail"
                      className="text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Your current password"
                      className="text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Password to change for"
                      className="text-gray-800"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <div className="text-destructive">
          {form.formState.errors.root?.message}
        </div>
        {statusMessage && (
          <ShowMessage
            type={statusMessage.type === "error" ? "error" : "success"}
            message={statusMessage.message}
          />
        )}
        <div className="flex justify-around mt-4">
          <Button disabled={form.formState.isSubmitting}>
            Confirm&nbsp;
            {form.formState.isSubmitting && (
              <Disc3Icon className="animate-spin" />
            )}
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => {
              form.reset();
              setStatusMessage(null);
              form.clearErrors();
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};
