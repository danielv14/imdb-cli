import { CommanderStatic } from 'commander';
import { SearchResultType } from '../types/searchResult';
import { IMDb } from './IMDb';

export const createCLI = (cliProgram: CommanderStatic) => {
  const { plot, limitPlot, orderBy, movies, series, title } = cliProgram;
  const searchByType = movies ? SearchResultType.Movies : series ? SearchResultType.Series : SearchResultType.All;
  const CLI = new IMDb({
    query: title,
    showPlot: !!plot,
    limitPlot,
    sortColumn: orderBy,
    searchByType,
  });
  return CLI;
};
