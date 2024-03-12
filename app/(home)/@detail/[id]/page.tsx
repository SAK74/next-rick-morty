import { CharacterCard } from "@/components/home/CharacterCard";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getCharacterById } from "@/services/getCharacterById";
import { Character } from "@/types";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  // const id = params.id;
  const character = await getCharacterById(id);
  return (
    // <Card className="" >
    //   <CardHeader>
    //     <CardTitle>{character?.name}</CardTitle>
    //   </CardHeader>
    // </Card>
    <CharacterCard character={character as Character} />
  );
}
