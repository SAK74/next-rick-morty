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
              <CharacterCard
                key={character.id}
                character={character}
                link={
                  <Link
                    href={`/${character.id}?${new URLSearchParams(
                      searchParams
                    )}`}
                  >
                    View detail
                  </Link>
                }
              ></CharacterCard>
            ))}
          </div>
          {data.info.pages > 1 && <ListPagination info={data.info} />}
        </>
      )}
    </>
  );
};
