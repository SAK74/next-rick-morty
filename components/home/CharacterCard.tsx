import type { Character, CustomFav } from "@/types";
import { type FC, type ReactNode, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Loading } from "../Loading";
import { EpisodeName } from "./Episode";
import { cn, formatDate } from "@/lib/utils";
import { HandleFav } from "./HandleFav";
import { RemoveFromFav } from "../favorites/RemoveFromFav";
import { HandleCustom } from "../favorites/HandleCustom";
import unknownHeroIcon from "@/assets/unknown.png";
import Link from "next/link";
import { type Favorite } from "@prisma/client";

const isCharacter = (
  character: Character | CustomFav
): character is Character => {
  return (
    Boolean((character as Character).species) &&
    Boolean((character as Character).location)
  );
};

export const CharacterCard: FC<{
  character: Character | CustomFav;
  linkHref?: string;
  isFavoritePage?: boolean;
  isCustom?: boolean;
  user?: string;
  userFavs?: Favorite["id"][];
}> = async (props) => {
  const { linkHref, isFavoritePage, isCustom, user, userFavs } = props;
  const character = props.character satisfies Omit<
    Character,
    "created" | "id"
  > & {
    created: string | Date;
    id: string | number;
  };

  let control: ReactNode = null;
  if (isFavoritePage) {
    control =
      user &&
      (isCustom ? (
        <HandleCustom id={character.id as string} user={user} />
      ) : (
        <RemoveFromFav id={character.id as number} user={user} />
      ));
  } else {
    const isFavorite =
      userFavs && isCharacter(character) && userFavs.includes(character.id);
    control = (
      <HandleFav
        isFavorite={!!isFavorite}
        id={character.id as number}
        user={user}
      />
    );
  }

  return (
    <div
      key={character.id}
      className="flex w-[450px] md:max-lg:w-[350px] h-[250px]"
    >
      <Link
        href={linkHref ?? ""}
        className="w-[200px] relative h-full md:max-lg:hidden"
      >
        <Image
          src={character.image || unknownHeroIcon}
          alt={character.name + "image"}
          fill
          className="rounded-l-lg"
        />
      </Link>

      <Card className="rounded-l-none bg-slate-100 flex-grow flex flex-col">
        <CardHeader className="pb-4">
          <CardTitle className="flex justify-between">
            {character.name}
            {control}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <span
              className={cn(
                {
                  "bg-green-500": character.status === "Alive",
                  "bg-red-800": character.status === "Dead",
                  "bg-gray-400": character.status === "unknown",
                },
                "size-3 rounded-full"
              )}
            ></span>
            <span>{character.status}</span>
            <span>-</span>
            <span>{character.species}</span>
          </div>
          <div>{character.gender}</div>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-grow pb-0 text-sm">
          {isCharacter(character) && (
            <div>
              <div className="text-gray-400">Last know location: </div>
              <p>{character.location?.name}</p>
            </div>
          )}
          {isCharacter(character) && character.episode && (
            <div>
              <div className="text-gray-400">First seen in:</div>
              <Suspense fallback={<Loading />}>
                <EpisodeName url={character.episode[0]} />
              </Suspense>
            </div>
          )}
          {isCustom && (
            <>
              <div className="flex-grow"></div>
              <div>Created: {formatDate(character.created)}</div>
            </>
          )}
        </CardContent>
        {linkHref && (
          <Link
            className="self-end mr-4 text-blue-400 hover:scale-105 hover:text-blue-500"
            href={linkHref}
          >
            View detail
          </Link>
        )}
      </Card>
    </div>
  );
};
