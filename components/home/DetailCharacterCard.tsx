import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Character } from "@/types";
import Image from "next/image";

import { FC } from "react";

export const DetailCharacterCard: FC<{ character: Character }> = ({
  character,
}) => {
  const { name, status, species, type, gender, origin, location, image } =
    character;
  const created = new Date(character.created).toLocaleDateString("en-UK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <Card className="w-[340px] lg:w-[400px]">
      <CardHeader className="text-center gap-4 flex-row justify-between items-center">
        <CardTitle className="">{name}</CardTitle>
        <Image
          src={image}
          alt={name + "image"}
          width={80}
          height={80}
          className="rounded-xl"
        />
      </CardHeader>
      <CardContent>
        <ul className="list-image-[radial-gradient(lightblue,blue)] list-inside space-y-4">
          {Object.entries({
            species,
            status,
            gender,
            origin: origin?.name,
            last_location: location?.name,
            type,
            created,
          }).map(([prop, val]) => (
            <li key={prop} className="">
              <span className="capitalize">{prop}: </span>
              <span className="ml-6">{val}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
