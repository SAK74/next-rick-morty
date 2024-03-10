import { getEpisodeByUrl } from "@/services/getEpisodeByUrl";
import { FC } from "react";

export const EpisodeName: FC<{ url: string }> = async ({ url }) => {
  const episode = await getEpisodeByUrl(url);
  // console.log({ episode });
  return episode.name;
};
