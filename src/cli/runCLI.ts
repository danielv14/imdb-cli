import * as program from 'commander';
import * as inquirer from 'inquirer';
import { IMDb } from './IMDb';
import { inquirerPromptQuestion } from './settings/inquirerPromptQuestion';

/**
 * Run the CLI program by creating a instance of IMDb CLI
 * and run methods from it based of user input
 * @param cliProgram program.CommanderStatic
 */
export const runCLI = async (cliProgram: program.CommanderStatic) => {
  const imdbInstance = createCLI(cliProgram);

  if (hasUserInput(cliProgram, 'title') && hasUserInput(cliProgram, 'info')) {
    imdbInstance.seriesInfo();
    return;
  }
  if (hasUserInput(cliProgram, 'title')) {
    imdbInstance.search();
    return;
  }
  // prompt the user for a search string
  const { searchString } = await inquirer.prompt(inquirerPromptQuestion);
  imdbInstance.searchQuery = searchString;
  imdbInstance.search();
};

const createCLI = (cliProgram: program.CommanderStatic) => {
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

const hasUserInput = (cliProgram: program.CommanderStatic, input: string) =>  !!cliProgram[input];
