import { FormattedItem, Item } from '../../types/item';
import { truncate } from '../../utils/truncate';
import { renderWithColor } from '../renderer/renderer';

export const getFormattedItem = (
  input: Item,
  includePlot: boolean = false,
  limitPlot: number,
  ): FormattedItem => {
  const result: FormattedItem = {
    'Title': input.Title,
    'Year': input.Year,
    'Type': input.Type,
    'IMDb ID': renderWithColor(input.imdbID),
  };
  if (includePlot && input.Plot) {
    result.Plot = truncate(input.Plot, limitPlot);
  }
  return result;
};
