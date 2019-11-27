import * as seriesMock from './mock/seriesMock';
import { getFullSeriesFromTitle } from './omdbApi';
import { SearchResultSortColumn, SearchResultSortOrder, SearchResultType, SortOrder } from './types/searchResult';
import * as utils from './utils';

describe('Utils functions', () => {
  describe('sanitizeQuery()', () => {
    it('should be defined', () => {
      expect(utils.sanitizeQuery).toBeDefined();
    });
    it('should sanitize a passed query', () => {
      const query = 'harry potter';
      expect(utils.sanitizeQuery(query)).toMatch('harry%20potter');
    });
    it('should not sanitize if not needed', () => {
      const query = 'Interstellar';
      expect(utils.sanitizeQuery(query)).toMatch(query);
    });
  });
  describe('sortColumn()', () => {
    it('should be defined', () => {
      expect(utils.sortByColumn).toBeDefined();
    });
    it('should sort array of columns', () => {
      const items = [
        { 'Title': 'a', 'Year': '2', 'Type': SearchResultType.Movies, 'IMDb ID': '2' },
        { 'Title': 'b', 'Year': '3', 'Type': SearchResultType.Movies, 'IMDb ID': '1' },
        { 'Title': 'c', 'Year': '1', 'Type': SearchResultType.Movies, 'IMDb ID': '3' },
      ];
      const sortedByTitle = utils.sortByColumn({
        items,
        column: SortOrder[SearchResultSortColumn.Title],
        order: SearchResultSortOrder.Ascending,
      });
      const sortedByYear = utils.sortByColumn({
        items,
        column: SortOrder[SearchResultSortColumn.Year],
        order: SearchResultSortOrder.Descending,
      });
      expect(sortedByTitle[0].Title).toMatch('a');
      expect(sortedByYear[0].Year === '3').toBeTruthy();
    });
  });
  describe('truncate()', () => {
    it('should properly truncate text', () => {
      const text = utils.truncate(
        'Harry, Ron, and Hermione search for Voldemort and other things that will be truncated', 40,
      );
      expect(text.includes('truncated')).not.toBeTruthy();
      expect(text.includes('Harry, Ron, and Hermione search')).toBeTruthy();
      expect(text.includes('...')).toBeTruthy();
    });
  });
  describe('calculateEpisodeAverageScore()', () => {
    it('should calulate average score based on episodes', () => {
      expect(utils.calculateEpisodeAverageScore(seriesMock.EPISODES_S01)).toEqual(seriesMock.SCORE_S01);
    });
    it('should exluce episodes which has no valid score', () => {
      expect(utils.calculateEpisodeAverageScore(seriesMock.EPISODES_S01_INVALID)).toEqual(seriesMock.SCORE_S01);
    });
  });
  describe('calculateSeasonAverageScore()', () => {
    it('should calculate average score based on a season', () => {
      expect(utils.calculateSeasonAverageScore(seriesMock.SEASON1).AverageScore).toEqual(seriesMock.SCORE_S01);
      expect(utils.calculateSeasonAverageScore(seriesMock.SEASON1).SeasonNumber)
      .toEqual(seriesMock.SEASON1.seasonNumber);
    });
  });
  describe('calculateSeriesAverageScore()', () => {
    it('should calculate average for each season in an entire series', () => {
      const seriesAverage = utils.calculateSeriesAverageScore(seriesMock.SERIES);
      expect(seriesAverage.Title).toEqual(seriesMock.SERIES.title);
      expect(seriesAverage.Seasons[0].AverageScore).toEqual(seriesMock.SCORE_S01);
      expect(seriesAverage.Seasons[1].AverageScore).toEqual(seriesMock.SCORE_S02);
    });
    it('should calculate average score for series taken from API', async () => {
      const series = await getFullSeriesFromTitle(utils.sanitizeQuery('game of thrones'));
      const seriesAverage = utils.calculateSeriesAverageScore(series);
      expect(seriesAverage.Title).toBeDefined();
      expect(seriesAverage.Seasons.length).toBeGreaterThan(1);
      seriesAverage.Seasons.map((season) => expect(season.AverageScore).toBeDefined());
    });
  });
});
