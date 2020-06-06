import { Item } from '../types/item';
import { SearchResultType } from '../types/searchResult';
import { IMDb } from './IMDb';

const queryObj = {
  query: 'harry potter',
};

const imdbInstance = new IMDb(queryObj);

describe('IMDb class', () => {
  it('should be defined ', () => {
    expect(IMDb).toBeDefined();
  });

  it('should return new instances of the class', () => {
    expect(imdbInstance).toBeInstanceOf(IMDb);
  });

  it('should default to not search by any type or show plot', () => {
    expect(imdbInstance.showPlot).toBe(false);
    expect(imdbInstance.searchByType).toBe(SearchResultType.All);
  });

  describe('getSearchResult()', () => {
    it('should return search result for a given query', async () => {
      const response = await imdbInstance.getSearchResult(imdbInstance.query);
      expect(response.length).toBeGreaterThan(0);
    });

    it('should to able to get only movies', async () => {
      const imdbInstanceHP = new IMDb({
        query: 'star wars',
        searchByType: SearchResultType.Movies,
      });
      const response = await imdbInstanceHP.getSearchResult(imdbInstanceHP.query);
      const filteredData = response.filter((item: Item) => {
        return item.Type === 'movie';
      });
      expect(filteredData.length).toBeGreaterThan(0);
    });

    it('should to able to get only series', async () => {
      const imdbInstanceSW = new IMDb({
        query: 'star wars',
        searchByType: SearchResultType.Series,
      });
      const response = await imdbInstanceSW.getSearchResult(imdbInstanceSW.query);
      const filteredData = response.filter((item: Item) => item.Type === 'series');
      expect(filteredData.length).toBeGreaterThan(0);
    });
  });
});
