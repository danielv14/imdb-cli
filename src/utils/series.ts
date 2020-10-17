import { Episode, Season, SeasonAverageScore, Series, SeriesAverageScore } from '../types/series';
import { calculateAverage } from './calculateAverage';
import { isEpisodeRated } from './episode';

export const NOT_RELEASED_TEXT = 'Not yet released';

export const calculateEpisodeAverageScore = (episodes: Episode[]): number => {
  const scores = episodes
    .filter(isEpisodeRated)
    .map((episode) => episode.imdbRating);
  return scores.length ? calculateAverage(scores) : 0;
};

export const calculateSeasonAverageScore = (season: Season) => {
  const averageScore = calculateEpisodeAverageScore(season.episodes);
  return {
    SeasonNumber: season.seasonNumber,
    AverageScore: averageScore > 0 ? averageScore : NOT_RELEASED_TEXT,
  } as SeasonAverageScore;
};

export const calculateSeriesAverageScore = (series: Series) => {
  return {
    Title: series.title,
    Seasons: series.seasons.map((season) => calculateSeasonAverageScore(season)),
  } as SeriesAverageScore;
};
