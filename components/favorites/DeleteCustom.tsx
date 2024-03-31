"use client";

import { Disc3Icon, Trash2Icon } from "lucide-react";
import { FC, useState } from "react";
import { MyTooltip } from "../Tooltip";
import { deleteCustom } from "@/actions/deleteCustomFav";

export const DeleteCustom: FC<{
  id: string;
}> = ({ id }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await deleteCustom(id);
    } catch {}
  };

  return (
    <>
      {loading && <Disc3Icon color="blue" className="animate-spin" />}
      {!loading && (
        <MyTooltip text={"Delete hero"}>
          <Trash2Icon
            fill="gray"
            className="cursor-pointer hover:scale-105"
            onClick={handleClick}
          />
        </MyTooltip>
      )}
    </>
  );
};
