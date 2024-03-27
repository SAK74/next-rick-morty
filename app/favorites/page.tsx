import { CharacterCard } from "@/components/home/CharacterCard";
import { getAllFavorites } from "@/services/getAllFavorites";
import { GetMultipleCharacters } from "@/services/getMultipleCharacters";

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
    <div>
      <h4>Favorite page</h4>
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
