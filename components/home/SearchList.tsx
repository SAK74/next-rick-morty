import { getAllCharacters } from "@/services/getAllCharacters";
import { FC } from "react";
import { Search } from "@/app/(home)/layout";
import { CharacterCard } from "./CharacterCard";
import Link from "next/link";
import { ListPagination } from "./Pagination";

export const SearchList: FC<Search> = async ({ searchParams }) => {
  const data = await getAllCharacters(
    new URLSearchParams(searchParams).toString()
  );
  return (
    <>
      {typeof data === "string" ? (
        <div className="text-rose-800">{data}</div>
      ) : (
        <>
          <div>{data.info.count} results was founded</div>
          {data.info.pages > 1 && <ListPagination info={data.info} />}
          <div className="flex flex-wrap gap-4 justify-around">
            {data.results.map((character) => (
              <Link
                key={character.id}
                href={`/${character.id}?${new URLSearchParams(searchParams)}`}
              >
                <CharacterCard character={character} />
              </Link>
            ))}
          </div>
          {data.info.pages > 1 && <ListPagination info={data.info} />}
        </>
      )}
    </>
  );
};
