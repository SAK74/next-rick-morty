import { Character, GeneralResponse } from "@/types";

const host = process.env.HOST || "http://localhost:3000";
const url = new URL("api/character", host);
export const getAllCharacters = async (query?: string) => {
  try {
    url.search = query || "";
    const resp = await fetch(url, {
      // cache: "no-cache",
      next: { revalidate: 1800 },
    });
    // console.log({ resp });
    const result = await resp.json();
    // console.log({ result });
    if (resp.status === 200) {
      return (result as GeneralResponse<Character>).results;
    }
    return result;
  } catch (err) {
    console.log({ err });
    return (err as Error).message;
  }
};
