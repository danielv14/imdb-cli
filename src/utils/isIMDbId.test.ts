import { isIMDbId } from './isIMDbId';

describe('utils/isIMDbId', () => {
  it('should return false for non valid string', () => {
    expect(isIMDbId('non valid imdb id')).toEqual(false);
  });
  it('should return true for valid string', () => {
    expect(isIMDbId('tt0926084')).toEqual(true);
  });
});
