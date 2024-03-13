import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Character } from "@/types";

import { FC } from "react";

export const DetailCharacterCard: FC<{ character: Character }> = ({
  character,
}) => {
  const {
    name,
    status,
    species,
    type,
    gender,
    origin: { name: origin },
    location: { name: last_location },
  } = character;
  const created = new Date(character.created).toLocaleDateString();
  return (
    <Card className="w-[400px]">
      <CardHeader className="text-center gap-4">
        <CardTitle className="">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-image-[radial-gradient(lightblue,blue)] list-inside space-y-4">
          {Object.entries({
            species,
            status,
            gender,
            origin,
            last_location,
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
