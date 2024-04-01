import { Character, CustomFav } from "@/types";
import { FC, ReactNode, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Loading } from "../Loading";
import { EpisodeName } from "./Episode";
import { cn, formatDate } from "@/lib/utils";
import { AddToFav } from "./AddToFav";
import { db } from "@/lib/db";
import { RemoveFromFav } from "../favorites/RemoveFromFav";
import { HandleCustom } from "../favorites/HandleCustom";
import unknownHeroIcon from "@/assets/unknown.png";

export const CharacterCard: FC<{
  character: Character | CustomFav;
  link: ReactNode;
  isFavoritePage?: boolean;
  isCustom?: boolean;
}> = async (props) => {
  const { link, isFavoritePage, isCustom } = props;
  const character = props.character satisfies Omit<
    Character,
    "created" | "id"
  > & {
    created: string | Date;
    id: string | number;
  };

  const isCharacter = (
    character: Character | CustomFav
  ): character is Character => {
    return (
      Boolean((character as Character).species) &&
      Boolean((character as Character).location)
    );
  };

  const isFavorite =
    isCharacter(character) &&
    (await db.favorite.findUnique({
      where: { id: character.id },
    }));

  return (
    <div key={character.id} className="flex w-[350px] lg:w-[500px] h-[275px]">
      <Image
        src={character.image || unknownHeroIcon}
        alt={character.name + "image"}
        width={200}
        height={250}
        className="h-full rounded-l-lg md:max-lg:hidden"
      />

      <Card className="rounded-l-none bg-slate-100 flex-grow flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between">
            {character.name}
            {!isFavoritePage ? (
              <AddToFav isFavorite={!!isFavorite} id={character.id as number} />
            ) : !isCustom ? (
              <RemoveFromFav id={character.id as number} />
            ) : (
              <HandleCustom id={character.id as string} />
            )}
          </CardTitle>
          <div className="flex gap-2 items-center">
            <span
              className={cn(
                {
                  "bg-green-500": character.status === "Alive",
                  "bg-red-800": character.status === "Dead",
                  "bg-gray-400": character.status === "unknown",
                },
                "w-3 h-3 rounded-full"
              )}
            ></span>
            <span>{character.status}</span>
            <span>-</span>
            <span>{character.species}</span>
          </div>
          <div>{character.gender}</div>
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-grow pb-0">
          {/* <div>{character.gender}</div> */}
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
        <div className="self-end mr-4 text-blue-400 hover:scale-105 hover:text-blue-500">
          {link}
        </div>
      </Card>
    </div>
  );
};
