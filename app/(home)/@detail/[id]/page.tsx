import { DetailCharacterCard } from "@/components/home/DetailCharacterCard";
import { getCharacterById } from "@/services/getCharacterById";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const character = await getCharacterById(id);
  if (typeof character === "string") {
    return character;
  }
  return <DetailCharacterCard character={character} />;
}
