import { Character } from "@/types";
import { FC } from "react";
import { Input } from "../ui/input";
import { SelectComponent } from "./SelectComponent";
import { Search } from "@/app/(home)/layout";

export const SearchComponent: FC<Search> = ({
  searchParams: { name, status },
}) => {
  const types: Character["status"][] = ["Alive", "Dead", "unknown"];

  return (
    <form className="py-8 inline-flex gap-4">
      <Input
        className=""
        type="text"
        name="name"
        defaultValue={name}
        placeholder="Hero name"
      />
      <SelectComponent values={types} defaultValue={status} />
      <button type="submit">Search</button>
    </form>
  );
};
