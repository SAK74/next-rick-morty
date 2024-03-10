import { Episode } from "@/types";

export const getEpisodeByUrl = async (url: string): Promise<Episode> => {
  const resp = await fetch(url, { next: { revalidate: 1800 } });
  return resp.json();
};
