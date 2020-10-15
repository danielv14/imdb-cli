import { Series } from '../types/series';
import { isEpisodeRated, isEpisodeReleased } from './episode';

export const getAllEpisodeScores = (series: Series): number[] => {
  const allEpisodes = series.seasons.reduce((episodes, currentSeason) => {
    const currentEpisodes = currentSeason.episodes
      .filter(isEpisodeReleased)
      .filter(isEpisodeRated);
    currentEpisodes.forEach((episode) => episodes.push(episode.imdbRating));
    return episodes;
  }, [] as number[]);
  return allEpisodes;
};
