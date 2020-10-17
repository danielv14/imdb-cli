import { getFullSeriesFromTitle } from '../lib/omdbApi';
import * as seriesMock from '../mock/seriesMock';
import { Episode, Season } from '../types/series';
import {
  calculateEpisodeAverageScore,
  calculateSeasonAverageScore,
  calculateSeriesAverageScore,
  NOT_RELEASED_TEXT,
} from './series';

describe('utils/series', () => {
  describe('calculateEpisodeAverageScore()', () => {
    it('should calulate average score based on episodes', () => {
      expect(calculateEpisodeAverageScore(seriesMock.EPISODES_S01)).toEqual(seriesMock.SCORE_S01);
    });
    it('should exluce episodes which has no valid score', () => {
      const episodes = seriesMock.EPISODES_S01_INVALID as unknown as Episode[];
      expect(calculateEpisodeAverageScore(episodes)).toEqual(seriesMock.SCORE_S01);
    });
  });
  describe('calculateSeasonAverageScore()', () => {
    it('should calculate average score based on a season', () => {
      expect(calculateSeasonAverageScore(seriesMock.SEASON1).AverageScore).toEqual(seriesMock.SCORE_S01);
      expect(calculateSeasonAverageScore(seriesMock.SEASON1).SeasonNumber)
      .toEqual(seriesMock.SEASON1.seasonNumber);
    });
    it('should handle seasons not yet released', () => {
      const invalidSeason = { ...seriesMock.SEASON1, episodes: [seriesMock.EPISODE_NOT_RELEASED] } as unknown as Season;
      expect(calculateSeasonAverageScore(invalidSeason).AverageScore).toEqual(NOT_RELEASED_TEXT);
    });
  });
  describe('calculateSeriesAverageScore()', () => {
    it('should calculate average for each season in an entire series', () => {
      const seriesAverage = calculateSeriesAverageScore(seriesMock.SERIES);
      expect(seriesAverage.Title).toEqual(seriesMock.SERIES.title);
      expect(seriesAverage.Seasons[0].AverageScore).toEqual(seriesMock.SCORE_S01);
      expect(seriesAverage.Seasons[1].AverageScore).toEqual(seriesMock.SCORE_S02);
    });
    it('should calculate average score for series taken from API', async () => {
      const series = await getFullSeriesFromTitle('game of thrones');
      const seriesAverage = calculateSeriesAverageScore(series);
      expect(seriesAverage.Title).toBeDefined();
      expect(seriesAverage.Seasons.length).toBeGreaterThan(1);
      seriesAverage.Seasons.map((season) => expect(season.AverageScore).toBeDefined());
    });
  });
});
