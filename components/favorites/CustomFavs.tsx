import { getAllCustomFav } from "@/services/getAllCustomFav";
import { CharacterCard } from "../home/CharacterCard";
import { auth } from "@/auth";

export const CustomFavs = async () => {
  const user = (await auth())?.user?.email;
  const customFav = user && (await getAllCustomFav(user));
  return (
    <>
      {customFav &&
        customFav.map((fav) => (
          <CharacterCard
            key={fav.id}
            character={fav}
            isFavoritePage
            isCustom
            user={user}
          />
        ))}
    </>
  );
};
