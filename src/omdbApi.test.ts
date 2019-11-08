  import * as omdbApi from './omdbApi';
  import { SearchResultType } from './types/searchResult';
  import { sanitizeQuery } from './utils';

  describe('OMDb API Functions', () => {
  describe('searchByQuery()', () => {
    it('should get search result for a given query', async () => {
      const items = await omdbApi.searchByQuery(sanitizeQuery('Harry potter'));
      expect(items.length).toBeGreaterThan(1);
    });
  });
  describe('searchByQueryAndType()', async () => {
    it('should get search result for a given query and type', async () => {
      const items = await omdbApi.searchByQueryAndType(sanitizeQuery('Star wars'), SearchResultType.Series);
      items.map((item) => expect(item.Type).toEqual(SearchResultType.Series));
    });
  });
  describe('getItemById()', async () => {
    it('should get a given item for a imdb id', async () => {
      const id = 'tt1201607';
      const item = await omdbApi.getItemById(id);
      expect(item.imdbID).toEqual(id);
    });
  });
  describe('getItemsByIds()', async () => {
    it('should get a given items for imdb ids', async () => {
      const ids = ['tt1201607', 'tt0241527'];
      const items = await omdbApi.getItemsByIds(ids);
      const resultItds = items.map((item) => item.imdbID);
      resultItds.map((id) => expect(ids.includes(id)).toEqual(true));
    });
  });
  describe('getSeasonFromTitle', () => {
    it('should get a specific season for a given title', async () => {
      const title = sanitizeQuery('Game of thrones');
      const season = await omdbApi.getSeasonFromTitle(title, 1);
      expect(season.Season).toEqual('1');
    });
  });
  describe('getSeasonFromId', () => {
    it('should get a specific season for a given imdb id', async () => {
      const id = 'tt0944947';
      const season = await omdbApi.getSeasonFromId(id, 1);
      expect(season.Season).toEqual('1');
    });
  });
});
