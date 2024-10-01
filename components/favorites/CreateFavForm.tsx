"use client";

import type { CustomFav } from "@/types";
import { type SubmitHandler, useForm } from "react-hook-form";
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

import { type Custom } from "@prisma/client";
import { type FC, useState } from "react";
import { addCustomToFav } from "@/actions/addCustomFav";
import Image from "next/image";
import defaultIcon from "@/assets/unknown.png";
import { useRouter } from "next/navigation";
import { editCustom } from "@/actions/editCustom";
import { Disc3Icon } from "lucide-react";
import { ImCross } from "react-icons/im";
import { GoBackButton } from "../GoBackButton";

export const CreateFavForm: FC<{ hero?: CustomFav; user: string }> = ({
  hero,
  user,
}) => {
  const defaultValues: Partial<CustomFav> = hero
    ? {
        name: hero.name,
        species: hero.species,
        gender: hero.gender,
        status: hero.status,
      }
    : {
        name: "",
        species: "",
        image: "",
      };
  const form = useForm<CustomFav>({
    resolver: zodResolver(customFavoriteSchema),
    defaultValues,
  });

  const router = useRouter();

  const [dataUrl, setDataUrl] = useState(() => hero?.image || "");

  const onValid: SubmitHandler<CustomFav> = async (data) => {
    if (!hero) {
      await addCustomToFav(user, { ...data, image: dataUrl });
    } else {
      await editCustom(user, hero.id, { ...data, image: dataUrl });
    }
    router.replace("/favorites");
    router.refresh();
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
                      className="basis-64 px-2"
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
                            // console.log("Reader: ", target?.result);
                            setDataUrl(result ? (result as string) : "");
                          });
                          fr.readAsDataURL(file);
                        } else {
                          setDataUrl("");
                        }
                      }}
                    />
                    {dataUrl && (
                      <ImCross
                        className="fill-destructive/80 hover:scale-110 cursor-pointer self-center"
                        title="Remove image"
                        onClick={() => {
                          setDataUrl("");
                          form.setValue("image", "");
                        }}
                      />
                    )}
                    <Image
                      src={dataUrl || defaultIcon}
                      alt="uploading image"
                      width={150}
                      height={200}
                      className="rounded-2xl"
                    />
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
        <div className="flex justify-between self-center w-11/12">
          <Button
            className="hover:bg-sky-900"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Submit&nbsp;
            {form.formState.isSubmitting && (
              <Disc3Icon className="animate-spin" />
            )}
          </Button>
          <GoBackButton variant={"destructive"}>Cancel</GoBackButton>
        </div>
      </form>
    </Form>
  );
};
