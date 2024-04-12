import { DetailCharacterCard } from "@/components/home/DetailCharacterCard";
import { Button } from "@/components/ui/button";
import { getCharacterById } from "@/services/getCharacterById";
import Link from "next/link";
import { Search } from "../../../layout";

export default async function Page({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: Search["searchParams"];
}) {
  const character = await getCharacterById(id);
  console.log(Page.name, { id, searchParams });
  if (typeof character === "string") {
    return character;
  }
  return (
    <div className="px-6 flex flex-col-reverse md:flex-col gap-4 ">
      <DetailCharacterCard character={character} />
      <Button size="lg" className="self-center">
        <Link href={"/?" + new URLSearchParams(searchParams).toString()}>
          Close details
        </Link>
      </Button>
    </div>
  );
}
