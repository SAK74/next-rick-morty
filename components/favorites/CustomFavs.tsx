import { getAllCustomFav } from "@/services/getAllCustomFav";
import { CharacterCard } from "../home/CharacterCard";

export const CustomFavs = async () => {
  const customFav = await getAllCustomFav();
  return (
    <>
      {customFav &&
        customFav.map((fav) => (
          <CharacterCard
            key={fav.id}
            character={fav}
            link=""
            isFavoritePage
            isCustom
          />
        ))}
    </>
  );
};
