import { getAllFavorites } from "@/services/getAllFavorites";
import { CharacterCard } from "../home/CharacterCard";
import { GetMultipleCharacters } from "@/services/getMultipleCharacters";
import { auth } from "@/auth";

export const Favorites = async () => {
  const user = (await auth())?.user?.email;
  const favorites = user && (await getAllFavorites(user));
  if (!favorites) {
    return "Something went wrong in db";
  }
  if (!favorites.length) {
    return null;
  }

  const heroes = await GetMultipleCharacters(favorites.map((fav) => fav.id));
  const renderedHero = Array.isArray(heroes) ? heroes : [heroes];

  return (
    <>
      {user &&
        renderedHero.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavoritePage
            user={user}
          />
        ))}
    </>
  );
};
