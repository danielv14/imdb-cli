import { getItemById, getItemsByIds, getSeasonFromTitle, searchByQuery, searchByQueryAndType } from './omdbApi';
import { SearchResultType } from './types/searchResult';
import { sanitizeQuery } from './utils';

describe('OMDb API Functions', () => {
  describe('searchByQuery()', () => {
    it('should get search result for a given query', async () => {
      const items = await searchByQuery(sanitizeQuery('Harry potter'));
      expect(items.length).toBeGreaterThan(1);
    });
  });
  describe('searchByQueryAndType()', async () => {
    it('should get search result for a given query and type', async () => {
      const items = await searchByQueryAndType(sanitizeQuery('Star wars'), SearchResultType.Series);
      items.map((item) => expect(item.Type).toEqual(SearchResultType.Series));
    });
  });
  describe('getItemById()', async () => {
    it('should get a given item for a imdb id', async () => {
      const id = 'tt1201607';
      const item = await getItemById(id);
      expect(item.imdbID).toEqual(id);
    });
  });
  describe('getItemsByIds()', async () => {
    it('should get a given items for imdb ids', async () => {
      const ids = ['tt1201607', 'tt0241527'];
      const items = await getItemsByIds(ids);
      const resultItds = items.map((item) => item.imdbID);
      resultItds.map((id) => expect(ids.includes(id)).toEqual(true));
    });
  });

});
