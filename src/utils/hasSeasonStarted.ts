import { Season } from '../types/series';

const NOT_RELEASED = 'N/A';

export const hasSeasonStarted = (season: Season): boolean => {
  const airedEpisodes = season.episodes.filter((episode) => episode.Released !== NOT_RELEASED );
  return !!airedEpisodes.length;
};
