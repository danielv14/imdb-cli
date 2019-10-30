import { SearchResultSortColumn, SearchResultSortOrder, SearchResultType, SortOrder } from './types/searchResult';
import { sanitizeQuery, sortByColumn } from './utils';

describe('Utils functions', () => {
  describe('sanitizeQuery()', () => {
    it('should be defined', () => {
      expect(sanitizeQuery).toBeDefined();
    });
    it('should sanitize a passed query', () => {
      const query = 'harry potter';
      expect(sanitizeQuery(query)).toMatch('harry%20potter');
    });
    it('should not sanitize if not needed', () => {
      const query = 'Interstellar';
      expect(sanitizeQuery(query)).toMatch(query);
    });
  });
  describe('sortColumn()', () => {
    it('should be defined', () => {
      expect(sortByColumn).toBeDefined();
    });
    it('should sort array of columns', () => {
      const items = [
        { 'Title': 'a', 'Year': '2', 'Type': SearchResultType.Movies, 'IMDb ID': '2' },
        { 'Title': 'b', 'Year': '3', 'Type': SearchResultType.Movies, 'IMDb ID': '1' },
        { 'Title': 'c', 'Year': '1', 'Type': SearchResultType.Movies, 'IMDb ID': '3' },
      ];
      const sortedByTitle = sortByColumn({
        items,
        column: SortOrder[SearchResultSortColumn.Title],
        order: SearchResultSortOrder.Ascending,
      });
      const sortedByYear = sortByColumn({
        items,
        column: SortOrder[SearchResultSortColumn.Year],
        order: SearchResultSortOrder.Descending,
      });
      expect(sortedByTitle[0].Title).toMatch('a');
      expect(sortedByYear[0].Year === '3').toBeTruthy();
    });
  });
});
