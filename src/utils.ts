import orderBy from 'lodash/orderBy';
import { SortObject } from './types/searchResult';
import { Episode, Season, SeasonAverageScore, Series, SeriesAverageScore } from './types/series';

/**
 * Encode a string as a URI component
 * @param {String} query to encode
 * @returns {String}
 */
export const sanitizeQuery = (query: string) => encodeURIComponent(query);

/**
 * Get a sorted array of objects sorted by object key value and by asc or desc order
 * @param {Array} items
 * @param {String} column
 * @param {String} order asc or desc
 */
export const sortByColumn = ({ items, column, order }: SortObject) => orderBy(items, [column], [order]);

/**
 * Truncate text
 * @param {String} text
 * @param {Number} limit
 * @returns {String}
 */
export const truncate = (text: string, limit: number): string => text ?  `${text.substring(0, limit)}...` : '';

export const calculateAverage = (arr: number[]): number => {
  const average = arr.reduce((a, b) => a + b, 0) / arr.length;
  return parseFloat(average.toFixed(1));
};

export const calculateEpisodeAverageScore = (episodes: Episode[]): number => {
  const scores = episodes
    .map((episode) => parseFloat(episode.imdbRating))
    .filter((rating) => !isNaN(rating));
  return calculateAverage(scores);
};

export const calculateSeasonAverageScore = (season: Season) => {
  const seasonAverage = calculateEpisodeAverageScore(season.episodes);
  return {
    SeasonNumber: season.seasonNumber,
    AverageScore: seasonAverage,
  } as SeasonAverageScore;
};

export const calculateSeriesAverageScore = (series: Series) => {
  return {
    Title: series.title,
    Seasons: series.seasons.map((season) => calculateSeasonAverageScore(season)),
  } as SeriesAverageScore;
};
