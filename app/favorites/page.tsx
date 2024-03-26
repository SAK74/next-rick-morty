import { CharacterCard } from "@/components/home/CharacterCard";
import { getAllFavorites } from "@/services/getAllFavorites";
import { GetMultipleCharacters } from "@/services/getMultipleCharacters";

export default async function FavoritePage() {
  const favorites = await getAllFavorites();
  const content = Array.isArray(favorites)
    ? await GetMultipleCharacters(favorites.map((fav) => fav.id))
    : favorites;
  return (
    <div>
      <h4>Favorite page</h4>
      <div className="flex flex-wrap gap-4 justify-around">
        {Array.isArray(content)
          ? content.map((character) => (
              <CharacterCard key={character.id} character={character} link="" />
            ))
          : content}
      </div>
    </div>
  );
}
