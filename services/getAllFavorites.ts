import { FavResponseType } from "@/app/db/favorites/route";
import { host } from "./getAllCharacters";

const favoritesURL = new URL("/db/favorites", host);

export const getAllFavorites = async () => {
  try {
    const resp = await fetch(favoritesURL, {
      next: { revalidate: 600, tags: ["favorites"] },
    });
    const result = (await resp.json()) as FavResponseType;
    if (result.message === "OK") {
      return result.result;
    }
    throw new Error((result.error as Error).message);
    // console.log(result.error);
    // return "Some thing went wrong in db";
  } catch (err) {
    // console.log(err);
    // return "Some thing went wrong in db";
  }
};
