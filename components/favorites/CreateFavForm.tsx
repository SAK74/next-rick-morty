"use client";

import { CustomFav } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { customFavoriteSchema } from "@/schemas";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Custom } from "@prisma/client";
import { useState } from "react";
import { addCustomToFav } from "@/actions/addCustomFav";
import Image from "next/image";

export const CreateFavForm = () => {
  const form = useForm<CustomFav>({
    resolver: zodResolver(customFavoriteSchema),
    defaultValues: { name: "", species: "", image: "" },
  });

  const [dataUrl, setDataUrl] = useState("");

  const onValid: SubmitHandler<CustomFav> = async (data) => {
    // console.log({ data });
    await addCustomToFav({ ...data, image: dataUrl });
    // console.log("Success!");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onValid)}
        className="flex flex-col gap-4 items-start"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Hero name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="species"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Species:</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Human, Alien, ..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field, fieldState: {}, formState: {} }) => {
            return (
              <FormItem className="flex justify-between gap-2">
                <FormLabel>Image:</FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      type="file"
                      accept="image/*"
                      onChange={(ev) => {
                        const file = ev.target.files?.item(0);
                        // const url = file && URL.createObjectURL(file);
                        // console.log({ url, file, value: ev.target.value });
                        // setCustomUrl(url || "");

                        field.onChange(ev);

                        if (file) {
                          const fr = new FileReader();
                          fr.addEventListener("load", ({ target }) => {
                            const result = target?.result;
                            console.log("Reader: ", target?.result);
                            setDataUrl(result ? (result as string) : "");
                          });
                          fr.readAsDataURL(file);
                        }
                      }}
                    />
                    {dataUrl && (
                      <Image
                        src={dataUrl}
                        alt="uploading image"
                        width={150}
                        height={200}
                        className="rounded-2xl"
                      />
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => {
            const genderValues: Custom["gender"][] = [
              "Female",
              "Male",
              "Genderless",
              "unknown",
            ];
            return (
              <FormItem>
                <FormLabel>Gender:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderValues.map((val) => (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => {
            const genderValues: Custom["status"][] = [
              "Alive",
              "Dead",
              "unknown",
            ];
            return (
              <FormItem>
                <FormLabel>Status:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderValues.map((val) => (
                      <SelectItem key={val} value={val}>
                        {val}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button className="bg-sky-600 hover:bg-sky-900" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
