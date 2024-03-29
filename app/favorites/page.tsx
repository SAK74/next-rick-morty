import { CharacterCard } from "@/components/home/CharacterCard";
import { Button } from "@/components/ui/button";
import { getAllFavorites } from "@/services/getAllFavorites";
import { GetMultipleCharacters } from "@/services/getMultipleCharacters";
import Link from "next/link";

export default async function FavoritePage({ params }: { params: {} }) {
  // console.log("Params in favorites: ", params);

  const favorites = await getAllFavorites();
  if (!favorites) {
    return "Some thing went wrong in db";
  }
  if (!favorites.length) {
    return "There is nothing here...";
  }
  const heroes = await GetMultipleCharacters(favorites.map((fav) => fav.id));
  const renderedHero = Array.isArray(heroes) ? heroes : [heroes];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className="bg-sky-600 self-end">
        <Link href={"/favorites/create"}>Create custom</Link>
      </Button>
      <div className="flex flex-wrap gap-4 justify-around">
        {renderedHero.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            link=""
            isFavoritePage
          />
        ))}
      </div>
    </div>
  );
}
