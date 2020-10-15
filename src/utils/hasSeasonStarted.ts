import { Season } from '../types/series';
import { isEpisodeReleased } from './episode';

export const hasSeasonStarted = (season: Season): boolean => {
  const airedEpisodes = season.episodes.filter(isEpisodeReleased);
  return !!airedEpisodes.length;
};
