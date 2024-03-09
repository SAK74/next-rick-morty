import { getAllCharacters } from "@/services/getAllCharacters";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const SearchList: FC<{}> = async () => {
  const characters = await getAllCharacters("");
  return (
    <section className="flex flex-wrap gap-4 justify-center">
      {characters.map((character) => {
        // console.log(character.status);
        return (
          <div key={character.id} className="flex w-[500px]">
            <Image
              src={character.image}
              alt={character.name + "image"}
              width={200}
              height={250}
              className="h-full rounded-l-lg"
            />
            <Card className="rounded-l-none bg-slate-100 flex-grow">
              <CardHeader>
                <CardTitle>{character.name}</CardTitle>
                {/* <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span> */}
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
              <CardContent>
                <div className="text-gray-400">Last know location: </div>
                <a href="#">{character.location.name}</a>
                <div className="text-gray-400">First seen in:</div>
                ...episode...
              </CardContent>
            </Card>
          </div>

          // <div className="w-24" key={character.id}>
          //   {character.name}
          // </div>
        );
      })}
    </section>
  );
};
