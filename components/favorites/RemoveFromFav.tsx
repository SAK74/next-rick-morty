"use client";

import { HeartOffIcon, Disc3Icon } from "lucide-react";
import { FC, useState } from "react";
import { MyTooltip } from "../Tooltip";
import { removeFromFav } from "@/actions/menageFavorite";

export const RemoveFromFav: FC<{
  id: number;
}> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await removeFromFav(id);
    } catch {}
  };

  return (
    <>
      {loading && <Disc3Icon color="blue" className="animate-spin" />}
      {!loading && (
        <MyTooltip text={"Remove from favorites"}>
          <HeartOffIcon
            fill="gray"
            className="cursor-pointer hover:scale-105"
            onClick={handleClick}
          />
        </MyTooltip>
      )}
    </>
  );
};
