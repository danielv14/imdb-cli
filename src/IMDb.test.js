const { IMDb } = require('./IMDb');

const queryObj = {
  query: 'harry+potter',
  originalQuery: 'harry potter'
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
    expect(imdbInstance.searchByType).toBe(null);
  });

  describe('determineType()', () => {
    it('should return the right type', () => {
      expect(IMDb.determineType({ movies: true })).toMatch('movie');
      expect(IMDb.determineType({ series: true })).toMatch('series');
      expect(IMDb.determineType({ series: false })).toBe(null);
      expect(IMDb.determineType({ movies: false })).toBe(null);
      expect(IMDb.determineType({})).toBe(null);
    });
  });

  describe('getAPIKey()', () => {
    it('should return the api key', () => {
      expect(imdbInstance.getAPIKey()).not.toBeNull();
    });
  });

  describe('getSearchResult()', () => {
    it('should return search result for a given query', async () => {
      const { data } = await imdbInstance.getSearchResult(imdbInstance.query);
      expect(data.Search.length).toBeGreaterThan(0);
    });

    it('should to able to get only movies', async () => {
      const imdbInstanceHP = new IMDb({
        query: 'star+wars',
        originalQuery: 'star wars',
        searchByType: 'movie'
      });
      const { data } = await imdbInstanceHP.getSearchResult(imdbInstanceHP.query);
      const filteredData = data.Search.filter(item => item.Type === 'movie');
      expect(filteredData.length).toBeGreaterThan(0);
    });

    it('should to able to get only series', async () => {
      const imdbInstanceSW = new IMDb({
        query: 'star+wars',
        originalQuery: 'star wars',
        searchByType: 'series'
      });
      const { data } = await imdbInstanceSW.getSearchResult(imdbInstanceSW.query);
      const filteredData = data.Search.filter(item => item.Type === 'series');
      expect(filteredData.length).toBeGreaterThan(0);
    });
  });

  describe('getItemByIMDbId()', () => {
    it('should get item by IMDb Id', async () => {
      const id = 'tt0458290';
      const { data } = await imdbInstance.getItemByIMDbId(id);
      expect(data.imdbID).toMatch(id);
    });
  });

  describe('getTruncatedtext()', () => {
    it('should properly truncate text', () => {
      const text = imdbInstance.getTruncatedText({
        text: 'Harry, Ron, and Hermione search for Voldemort and other things that will be truncated'
      });
      expect(text.includes('truncated')).not.toBeTruthy();
      expect(text.includes('Harry, Ron, and Hermione search')).toBeTruthy();
      expect(text.includes('...')).toBeTruthy();
    });
  });

  describe('getFormattedSearchResultWithPlot()', () => {
    it('should return expected object', () => {
      const objFormatted = imdbInstance.getFormattedSearchResultWithPlot({
        Title: 'Hello world',
        Year: '1991',
        Type: 'movie',
        Plot:
          'This is a very long plot and some if it will and should be truncated and I think if i type long enough it will be truncated',
        imdbID: 'tt123456'
      });
      'Title,Year,Type,Plot,IMDb ID'.split(',').map(objKey => expect(objFormatted).toHaveProperty(objKey));
    });
  });

  describe('getFormattedSearchResult()', () => {
    it('should return expected object', () => {
      const objFormatted = imdbInstance.getFormattedSearchResult({
        Title: 'Hello world',
        Year: '1991',
        Type: 'movie',
        imdbID: 'tt123456'
      });
      'Title,Year,Type,IMDb ID'.split(',').map(objKey => expect(objFormatted).toHaveProperty(objKey));
      expect(objFormatted).not.toHaveProperty('Plot');
    });
  });

  describe('createSearchResult()', () => {
    it('should add search results from a given array', () => {
      const results = [{ name: 'a' }, { name: 'b' }];
      expect(imdbInstance.results.length).toBe(0);
      imdbInstance.createSearchResult(results);
      expect(imdbInstance.results.length).toBe(results.length);
      expect(imdbInstance.results[0].name).toMatch(results[0].name);
    });
  });
});
