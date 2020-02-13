import { SearchResultType } from '../types/searchResult';
import {
  getFullSeriesFromId,
  getFullSeriesFromTitle,
  getItemById,
  getItemsByIds,
  getSeasonFromId,
  getSeasonFromTitle,
  searchByQuery,
  searchByQueryAndType,
 } from './omdbApi';

describe('OMDb API Functions', () => {
  describe('searchByQuery()', () => {
    it('should get search result for a given query', async () => {
      const items = await searchByQuery('Harry potter');
      expect(items.length).toBeGreaterThan(1);
    });
  });
  describe('searchByQueryAndType()', () => {
    it('should get search result for a given query and type', async () => {
      const items = await searchByQueryAndType('Star wars', SearchResultType.Series);
      items.map((item) => expect(item.Type).toEqual(SearchResultType.Series));
    });
  });
  describe('getItemById()', () => {
    it('should get a given item for a imdb id', async () => {
      const id = 'tt1201607';
      const item = await getItemById(id);
      expect(item.imdbID).toEqual(id);
    });
  });
  describe('getItemsByIds()', () => {
    it('should get a given items for imdb ids', async () => {
      const ids = ['tt1201607', 'tt0241527'];
      const items = await getItemsByIds(ids);
      const resultItds = items.map((item) => item.imdbID);
      resultItds.map((id) => expect(ids.includes(id)).toEqual(true));
    });
  });
  describe('getSeasonFromTitle()', () => {
    it('should get a specific season for a given title', async () => {
      const title = 'Game of thrones';
      const season = await getSeasonFromTitle(title, 1);
      expect(season.seasonNumber).toEqual('1');
    });
  });
  describe('getSeasonFromId()', () => {
    it('should get a specific season for a given imdb id', async () => {
      const id = 'tt0944947';
      const season = await getSeasonFromId(id, 1);
      expect(season.seasonNumber).toEqual('1');
    });
  });
  describe('getAllSeasonsFromId()', () => {
    it('should get full series for a given imdb id', async () => {
      const id = 'tt0944947';
      const series = await getFullSeriesFromId(id);
      expect(series.title).toBeDefined();
      expect(series.totalSeasons).toBeDefined();
      expect(series.seasons.length).toBeGreaterThan(0);
      expect(series.seasons[0].title).toBeDefined();
      expect(series.seasons[0].episodes[0].imdbRating).toBeDefined();
    });
  });
  describe('getAllSeasonsFromTitle()', () => {
    it('should get full series for a given title', async () => {
      const title = 'game of thrones';
      const series = await getFullSeriesFromTitle(title);
      expect(series.title).toBe('Game of Thrones');
      expect(series.totalSeasons).toBeDefined();
      expect(series.seasons.length).toBeGreaterThan(0);
      expect(series.seasons[0].title).toBeDefined();
      expect(series.seasons[0].episodes[0].imdbRating).toBeDefined();
    });
  });
});
