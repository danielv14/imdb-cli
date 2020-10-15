import { Episode, Season, SeasonAverageScore, Series, SeriesAverageScore } from '../types/series';
import { calculateAverage } from './calculateAverage';
import { episodeRatingAsNumber } from './episode';
import { hasSeasonStarted } from './hasSeasonStarted';

export const NOT_RELEASED_TEXT = 'Not yet released';

export const calculateEpisodeAverageScore = (episodes: Episode[]): number => {
  const scores = episodes
    .map(episodeRatingAsNumber)
    .filter((rating) => !isNaN(rating));
  return calculateAverage(scores);
};

export const calculateSeasonAverageScore = (season: Season) => {
  return {
    SeasonNumber: season.seasonNumber,
    AverageScore: hasSeasonStarted(season) ? calculateEpisodeAverageScore(season.episodes) : NOT_RELEASED_TEXT,
  } as SeasonAverageScore;
};

export const calculateSeriesAverageScore = (series: Series) => {
  return {
    Title: series.title,
    Seasons: series.seasons.map((season) => calculateSeasonAverageScore(season)),
  } as SeriesAverageScore;
};
