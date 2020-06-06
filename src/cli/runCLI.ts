import * as program from 'commander';
import * as inquirer from 'inquirer';
import { createCLI } from './createCLI';
import { inputQuestion } from './settings/userInput';

/**
 * Run the CLI program by creating a instance of IMDb CLI
 * and run methods from it based of user input
 * @param cliProgram program.CommanderStatic
 */
export const runCLI = async (cliProgram: program.CommanderStatic) => {
  const imdbInstance = createCLI(cliProgram);

  if (hasUserInput(cliProgram, 'title') && hasUserInput(cliProgram, 'info')) {
    imdbInstance.getSeriesInfo();
    return;
  }
  if (hasUserInput(cliProgram, 'title')) {
    imdbInstance.run();
    return;
  }
  // prompt the user for a search string
  const { searchString } = await inquirer.prompt(inputQuestion);
  imdbInstance.searchQuery = searchString;
  imdbInstance.run();
};

const hasUserInput = (cliProgram: program.CommanderStatic, input: string) =>  !!cliProgram[input];
