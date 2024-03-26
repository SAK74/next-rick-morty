import { Character } from "@/types";
import { host } from "./getAllCharacters";

export const GetMultipleCharacters = async (ids: number[]) => {
  const multipleURL = new URL(`api/character/${ids}`, host);

  const resp = await fetch(multipleURL);
  const res = await resp.json();
  // console.log({ res });
  return res as Character[];
};
