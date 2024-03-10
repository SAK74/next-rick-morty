import { Character, GeneralResponse } from "@/types";

const host = process.env.HOST || "http://localhost:3000";
const url = new URL("api/character", host);
export const getAllCharacters = async (query?: string) => {
  url.search = query || "";
  const resp = await fetch(url, {
    // cache: "no-cache",
    next: { revalidate: 1800 },
  });
  const result = (await resp.json()) as GeneralResponse<Character>;
  // console.log({ result });
  return result.results;
};
