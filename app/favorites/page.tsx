import { CustomFavs } from "@/components/favorites/CustomFavs";
import { Favorites } from "@/components/favorites/Favorites";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FavoritePage({ params }: { params: {} }) {
  // console.log("Params in favorites: ", params);

  return (
    <div className="flex flex-col gap-4 p-4">
      <Button className="bg-sky-600 self-end">
        <Link href={"/favorites/create"}>Create custom</Link>
      </Button>
      <div className="flex flex-wrap gap-4 justify-around">
        <CustomFavs />
        <Favorites />
      </div>
    </div>
  );
}

export const dynamic = "auto";
