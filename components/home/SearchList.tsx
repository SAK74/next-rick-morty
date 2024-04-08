import { getAllCharacters } from "@/services/getAllCharacters";
import { FC } from "react";
import { Search } from "@/app/(home)/layout";
import { CharacterCard } from "./CharacterCard";
import Link from "next/link";
import { ListPagination } from "./Pagination";
import { auth } from "@/auth";
import { getAllFavorites } from "@/services/getAllFavorites";

export const SearchList: FC<Search> = async ({ searchParams }) => {
  const data = await getAllCharacters(
    new URLSearchParams(searchParams).toString()
  );
  const user = (await auth())?.user;
  const userEmail = user && user.email!;
  const userFavs = userEmail
    ? (await getAllFavorites(userEmail))?.map((fav) => fav.id)
    : undefined;
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
                user={userEmail}
                userFavs={userFavs}
              ></CharacterCard>
            ))}
          </div>
          {data.info.pages > 1 && <ListPagination info={data.info} />}
        </>
      )}
    </>
  );
};
