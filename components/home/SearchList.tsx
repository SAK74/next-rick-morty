import { getAllCharacters } from "@/services/getAllCharacters";
import { FC } from "react";
import { Search } from "@/app/(home)/layout";
import { CharacterCard } from "./CharacterCard";
import Link from "next/link";

export const SearchList: FC<Search> = async ({ searchParams }) => {
  const characters = await getAllCharacters(
    new URLSearchParams(searchParams).toString()
  );
  return (
    <section className="flex flex-wrap gap-4 justify-center">
      {!Array.isArray(characters) ? (
        <div className="text-rose-800">{characters}</div>
      ) : (
        characters.map((character) => (
          <Link key={character.id} href={`/${character.id}`}>
            <CharacterCard character={character} />
          </Link>
        ))
      )}
    </section>
  );
};
