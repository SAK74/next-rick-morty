import { Character, DataResponse } from "@/types";

export const host =
  process.env.NODE_ENV === "development"
    ? process.env.HOST || "http://localhost:3000"
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

const url = new URL("api/character", host);

export const getAllCharacters = async (query?: string) => {
  // console.log({ url });
  try {
    url.search = query || "";
    const resp = await fetch(url, {
      // cache: "no-cache",
      // next: { revalidate: 1800 },
    });
    const result = await resp.json();
    // console.log({ result });
    if (resp.status === 200) {
      return result as DataResponse<Character>;
    }
    return result as string;
  } catch (err) {
    console.log("getAllCharacters: ", err);
    return (err as Error).message;
  }
};
