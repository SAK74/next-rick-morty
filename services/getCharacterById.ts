import { Character } from "@/types";
import { host } from "./getAllCharacters";

export const getCharacterById = async (id: string) => {
  try {
    const resp = await fetch(host + "/api/character/" + id, {
      // cache: "no-cache",
      next: { revalidate: 1800 },
    });
    const result = await resp.json();
    if (resp.status === 200) {
      return result as Character;
    } else {
      console.log({ result });
      // TO DO in false case
      return "Error";
    }
  } catch (err) {
    console.log({ err });
    return (err as Error).message;
  }
};
