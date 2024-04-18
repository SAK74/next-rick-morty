"use client";

import { Heart as HeartIcon, Disc3Icon } from "lucide-react";
import { FC, useState } from "react";
import { MyTooltip } from "../Tooltip";
import { addToFav, removeFromFav } from "@/actions/menageFavorite";
import { cn } from "@/lib/utils";

export const HandleFav: FC<{
  isFavorite: boolean;
  id: number;
  user?: string;
}> = ({ isFavorite, id, user }) => {
  const [isFav, setIsFav] = useState<boolean>(() => isFavorite);
  const [loading, setLoading] = useState(false);

  const handleAddToFav = async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    try {
      if (!isFav) {
        await addToFav(user, id);
        setIsFav(true);
      } else {
        await removeFromFav(user, id);
        setIsFav(false);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const tooltipText = !user
    ? "Must loggin to select"
    : !isFav
    ? "Add to favorites"
    : "Remove from favorites";

  return (
    <>
      {loading && <Disc3Icon color="blue" className="animate-spin" />}
      {!loading && (
        <MyTooltip
          text={tooltipText}
          className={cn({ "bg-destructive/70": !user })}
        >
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
