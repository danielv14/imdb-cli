import IMDb from './IMDb';
import {Item, SearchResultType } from './types/searchResult';

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

  describe('determineType()', () => {
    it('should return the right type', () => {
      expect(IMDb.determineType({ movies: true })).toMatch(SearchResultType.Movies);
      expect(IMDb.determineType({ series: true })).toMatch(SearchResultType.Series);
      expect(IMDb.determineType({ series: false })).toBe(SearchResultType.All);
      expect(IMDb.determineType({ movies: false })).toBe(SearchResultType.All);
      expect(IMDb.determineType({})).toBe(SearchResultType.All);
    });
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

  describe('getItemByIMDbId()', () => {
    it('should get item by IMDb Id', async () => {
      const id = 'tt0458290';
      const item = await imdbInstance.getItemByIMDbId(id);
      expect(item.imdbID).toMatch(id);
    });
  });

  describe('getFullItemsByIMDBIds()', () => {
    it('should get items by IMDb Ids', async () => {
      const ids = ['tt0458290', 'tt0330373'];
      const items = await imdbInstance.getFullItemsByIMDBIds(ids);
      expect(items.length).toBe(2);
      items.map((item, index) => expect(item.imdbID).toEqual(ids[index]));
    });
  });

  describe('getFormattedSearchResult()', () => {
    it('should return expected object', () => {
      const objFormatted = imdbInstance.getFormattedSearchResult({
        Title: 'Hello world',
        Year: '1991',
        Type: 'movie',
        imdbID: 'tt123456',
      });
      'Title,Year,Type,IMDb ID'.split(',').map((objKey: string) => expect(objFormatted).toHaveProperty(objKey));
      expect(objFormatted).not.toHaveProperty('Plot');
    });
    it('should return expected object with plot', () => {
      const objFormatted = imdbInstance.getFormattedSearchResult({
        Title: 'Hello world',
        Year: '1991',
        Type: 'movie',
        Plot:
          'This is a very long plot and some if it will and should be truncated and I think',
        imdbID: 'tt123456',
      }, true);
      'Title,Year,Type,Plot,IMDb ID'.split(',').map((objKey: string) => expect(objFormatted).toHaveProperty(objKey));
    });
  });

  describe('createSearchResult()', () => {
    it('should add search results from a given array', () => {
      const results = [{ Title: 'a' }, { Title: 'b' }];
      expect(imdbInstance.results.length).toBe(0);
      imdbInstance.createSearchResult(results);
      expect(imdbInstance.results.length).toBe(results.length);
      expect(imdbInstance.results[0].Title).toMatch(results[0].Title);
    });
  });
});
