import * as program from 'commander';
import * as inquirer from 'inquirer';
import { IMDb } from './IMDb';
import { inquirerPromptQuestion } from './settings/inquirerPromptQuestion';

export const runCLI = async (cliProgram: program.CommanderStatic) => {
  const { plot, limitPlot, orderBy, movies, series, title, info } = cliProgram;
  const imdbInstance = new IMDb({
    showPlot: !!plot,
    limitPlot,
    sortColumn: orderBy,
    searchByType: IMDb.determineType({ movies, series }),
  });
  if (hasUserInput(cliProgram, 'title')) {
    imdbInstance.searchQuery = title;
    if (hasUserInput(cliProgram, 'info')) {
      imdbInstance.seriesInfo();
    } else {
      imdbInstance.search();
    }
  } else {
    // prompt the user for a search string
    const { searchString } = await inquirer.prompt(inquirerPromptQuestion);
    imdbInstance.searchQuery = searchString;
    imdbInstance.search();
  }
};

const hasUserInput = (cliProgram: program.CommanderStatic, input: string) =>  !!cliProgram[input];
