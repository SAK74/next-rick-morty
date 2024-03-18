import { Character, DataResponse } from "@/types";
import path from "path";

const host = process.env.HOST || "http://localhost:3000";
const url = new URL("api/character", host);

const testURL = path.resolve(__dirname, "../");
export const getAllCharacters = async (query?: string) => {
  console.log({ testURL });
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
      return result as DataResponse<Character>;
    }
    return result as string;
  } catch (err) {
    console.log({ err });
    return (err as Error).message;
  }
};
