"use client";

import { Heart as HeartIcon, Disc3Icon } from "lucide-react";
import { FC, useState } from "react";
import { MyTooltip } from "../Tooltip";
import { addToFav, removeFromFav } from "@/actions/menageFavorite";

export const AddToFav: FC<{
  isFavorite: boolean;
  id: number;
}> = ({ isFavorite, id }) => {
  const [isFav, setIsFav] = useState<boolean>(() => isFavorite);
  const [loading, setLoading] = useState(false);

  const handleAddToFav = async () => {
    setLoading(true);
    try {
      if (!isFav) {
        await addToFav(id);
        setIsFav(true);
      } else {
        await removeFromFav(id);
        setIsFav(false);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Disc3Icon color="blue" className="animate-spin" />}
      {!loading && (
        <MyTooltip text={!isFav ? "Add to favorites" : "Remove from favorites"}>
          <HeartIcon
            fill={isFav ? "red" : "none"}
            className="cursor-pointer hover:scale-105"
            onClick={handleAddToFav}
          />
        </MyTooltip>
      )}
    </>
  );
};
