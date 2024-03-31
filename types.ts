import { z } from "zod";
import { customFavoriteSchema } from "./schemas";

export type Character = {
  id: number; //	The id of the character.
  name: string; //	The name of the character.
  status: "Alive" | "Dead" | "unknown"; //	The status of the character ('Alive', 'Dead' or 'unknown').
  species: string; //	The species of the character.
  type: string; //	The type or subspecies of the character.
  gender: string; //	The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
  origin: {
    name: string;
    url: string;
  }; //	Name and link to the character's origin location.
  location: {
    name: string;
    url: string;
  }; //	Name and link to the character's last known location endpoint.
  image: string; // (url)	Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
  episode: string[]; // (urls)	List of episodes in which this character appeared.
  url: string; // (url)	Link to the character's own URL endpoint.
  created: string; //	Time at which the character was created in the database.
};

export type Episode = {
  id: number; //	The id of the episode.
  name: string; //	The name of the episode.
  air_date: string; //	The air date of the episode.
  episode: string; //	The code of the episode.
  characters: string[]; // (urls)	List of characters who have been seen in the episode.
  url: string; // (url)	Link to the episode's own endpoint.
  created: string; //	Time at which the episode was created in the database.
};

export type GeneralResponse = {
  info: {
    count: number; //	The length of the response
    pages: number; //	The amount of pages
    next: string | null; // (url)	Link to the next page (if it exists)
    prev: string | null; // (url)	Link to the previous page (if it exists)
  };
  // results: T[];
};

export type DataResponse<T extends Character | Episode> = GeneralResponse & {
  results: T[];
};

export type FavResponseType<T> =
  | {
      message: "OK";
      result: T[];
    }
  | {
      message: "Error";
      error: unknown;
    };

export type CustomFav = z.infer<typeof customFavoriteSchema>;
