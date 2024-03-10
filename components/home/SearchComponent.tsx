import { Search } from "@/app/(home)/page";
import { Character } from "@/types";
import { FC } from "react";

export const SearchComponent: FC<Search> = ({
  searchParams: { name, status },
}) => {
  const types: Character["status"][] = ["Alive", "Dead", "unknown"];

  return (
    <form className="py-8">
      <input type="text" name="name" defaultValue={name} />
      <select name="status" defaultValue={status}>
        <option value="" className="text-gray-400" disabled>
          select type
        </option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button type="submit">Search</button>
    </form>
  );
};
