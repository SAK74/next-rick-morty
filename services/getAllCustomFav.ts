// import { FavResponseType } from "@/app/db/favorites/route";
import { CustomFav, FavResponseType } from "@/types";
import { host } from "./getAllCharacters";

const favoritesURL = new URL("/db/custom", host);

export const getAllCustomFav = async () => {
  try {
    const resp = await fetch(favoritesURL, {
      next: {
        // revalidate: 600,
        tags: ["custom"],
      },
    });
    const result = (await resp.json()) as FavResponseType<CustomFav>;
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
