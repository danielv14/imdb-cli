import * as asciichart from 'asciichart';
import { Season, Series } from '../types/series';
import { episodeRatingAsNumber, isEpisodeRated, isEpisodeReleased } from './episode';

export const getAllEpisodeScores = (series: Series): number[] => {
  const allEpisodes = series.seasons.reduce((episodes, currentSeason) => {
    const currentEpisodes = currentSeason.episodes
      .filter(isEpisodeReleased)
      .filter(isEpisodeRated)
      .map(episodeRatingAsNumber);
    currentEpisodes.forEach((rating) => episodes.push(rating));
    return episodes;
  }, [] as number[]);
  return allEpisodes;
};
