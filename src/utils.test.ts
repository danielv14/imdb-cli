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
      const items = [{ title: 'b', year: 3 }, { title: 'a', year: 2 }, { title: 'c', year: 1 }];
      const sortedByTitle = sortByColumn({ items, column: 'title', order: 'asc' });
      const sortedByYear = sortByColumn({ items, column: 'year', order: 'desc' });
      expect(sortedByTitle[0].title).toMatch('a');
      expect(sortedByYear[0].year === 3).toBeTruthy();
    });
  });
});
