"use client";

import { Disc3Icon, Trash2Icon, PencilIcon } from "lucide-react";
import { FC, useState } from "react";
import { MyTooltip } from "../Tooltip";
import { deleteCustom } from "@/actions/deleteCustomFav";
import { useRouter } from "next/navigation";

export const HandleCustom: FC<{
  id: string;
  user: string;
}> = ({ id, user }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteCustom(user, id);
    } catch {}
  };

  const handleEdit = () => {
    router.push(`/favorites/create/${id}`);
  };

  return (
    <>
      {loading && <Disc3Icon color="blue" className="animate-spin" />}
      {!loading && (
        <div className="flex gap-2">
          <MyTooltip text={"Edit hero"}>
            <PencilIcon fill="gray" onClick={handleEdit} />
          </MyTooltip>

          <MyTooltip text={"Delete hero"}>
            <Trash2Icon fill="gray" onClick={handleDelete} />
          </MyTooltip>
        </div>
      )}
    </>
  );
};
