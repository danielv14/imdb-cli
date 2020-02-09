import { truncate } from './truncate';
describe('utils/truncate', () => {
  it('should properly truncate text', () => {
    const text = truncate(
      'Harry, Ron, and Hermione search for Voldemort and other things that will be truncated', 40,
    );
    expect(text.includes('truncated')).not.toBeTruthy();
    expect(text.includes('Harry, Ron, and Hermione search')).toBeTruthy();
    expect(text.includes('...')).toBeTruthy();
  });
});
