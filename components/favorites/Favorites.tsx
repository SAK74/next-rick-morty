import { getAllFavorites } from "@/services/getAllFavorites";
import { CharacterCard } from "../home/CharacterCard";
import { GetMultipleCharacters } from "@/services/getMultipleCharacters";

export const Favorites = async () => {
  const favorites = await getAllFavorites();
  if (!favorites) {
    return "Some thing went wrong in db";
  }
  if (!favorites.length) {
    return null;
  }

  const heroes = await GetMultipleCharacters(favorites.map((fav) => fav.id));
  const renderedHero = Array.isArray(heroes) ? heroes : [heroes];

  return (
    <>
      {renderedHero.map((character) => (
        <CharacterCard
          key={character.id}
          character={character}
          link=""
          isFavoritePage
        />
      ))}
    </>
  );
};
