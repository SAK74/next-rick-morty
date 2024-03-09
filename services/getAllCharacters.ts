import { CharacterResponse } from "@/types";
// import { headers } from "next/headers";

const host = process.env.HOST || "http://localhost:3000";
const url = new URL("api", host);
const apiURL = process.env.API_URL;
export const getAllCharacters = async (query?: string) => {
  // const _headers = headers();
  // console.log({ _headers });

  // const resp = await fetch(apiURL + "/character", );
  url.search = query || "";
  const resp = await fetch(url, { cache: "default" });
  const result = (await resp.json()) as CharacterResponse;
  // console.log({ result: result.results });
  return result.results;
};
