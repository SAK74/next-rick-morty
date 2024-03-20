import { Character } from "@/types";
import { FC, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Loading } from "../Loading";
import { EpisodeName } from "./Episode";
import { cn } from "@/lib/utils";

export const CharacterCard: FC<{ character: Character }> = ({ character }) => {
  return (
    <div key={character.id} className="flex w-[350px] lg:w-[500px] h-[250px]">
      <Image
        src={character.image}
        alt={character.name + "image"}
        width={200}
        height={250}
        className="h-full rounded-l-lg md:max-lg:hidden"
      />

      <Card className="rounded-l-none bg-slate-100 flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>{character.name}</CardTitle>
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
        </CardHeader>
        <CardContent className="flex flex-col justify-between flex-grow">
          <div>
            <div className="text-gray-400">Last know location: </div>
            <p>{character.location.name}</p>
          </div>
          <div>
            <div className="text-gray-400">First seen in:</div>
            <Suspense fallback={<Loading />}>
              <EpisodeName url={character.episode[0]} />
            </Suspense>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
