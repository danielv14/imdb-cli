import { getFormattedItem } from './formattedItem';
const title = {
  Title: 'Hello world',
  Year: '1991',
  Type: 'movie',
  imdbID: 'tt123456',
};
const titleWithPlot = {
  ...title,
  Plot:
  'This is a very long plot and some if it will and should be truncated and I think',
};
describe('formattedItem mappings', () => {
  it('should return expected object', () => {
    const objFormatted = getFormattedItem(title, false, 40);
    'Title,Year,Type,IMDb ID'.split(',').map((objKey: string) => expect(objFormatted).toHaveProperty(objKey));
    expect(objFormatted).not.toHaveProperty('Plot');
  });

  it('should return expected object with plot', () => {
    const objFormatted = getFormattedItem(titleWithPlot, true, 40);
    'Title,Year,Type,Plot,IMDb ID'.split(',').map((objKey: string) => expect(objFormatted).toHaveProperty(objKey));
  });
});
