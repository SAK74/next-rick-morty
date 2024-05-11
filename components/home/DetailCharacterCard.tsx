import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Character } from "@/types";
import { GiSplitCross as CrossIcon } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";

import { FC } from "react";

export const DetailCharacterCard: FC<{
  character: Character;
  href: string;
}> = ({ character, href }) => {
  const { name, status, species, type, gender, origin, location, image } =
    character;
  const created = formatDate(character.created);
  return (
    <Card className="w-[340px] lg:w-[400px] relative">
      <Link
        href={href}
        className="absolute top-3 left-3 p-1 rounded-sm hover:border hover:bg-gray-100 active:scale-90"
      >
        <CrossIcon size={26} className="fill-destructive/80" />
      </Link>
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
