import { CommanderStatic } from 'commander';
import { IMDb } from './IMDb';

export const createCLI = (cliProgram: CommanderStatic) => {
  const { plot, limitPlot, orderBy, movies, series, title } = cliProgram;
  const CLI = new IMDb({
    query: title,
    showPlot: !!plot,
    limitPlot,
    sortColumn: orderBy,
    searchByType: IMDb.determineType({ movies, series }),
  });
  return CLI;
};
