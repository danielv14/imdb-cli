const { sanitizeQuery } = require('./utils');

describe('Utils functions', () => {
  describe('sanitizeQuery', () => {
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
});
