import * as program from 'commander';
import { renderErrorString } from './renderer/renderer';
import { CommandOption, commandOptions } from './settings/commands';
import { packageVersion } from './settings/version';

const ERROR_MOVIE_AND_SERIES_ARGS = `Cannot use both "movie (-m)" and "series (-s)" parameter together.`;

/**
 * Process cli arguments and parse process.argv
 * @param cliProgram
 */
export const processProgramArgs = (cliProgram: program.CommanderStatic) => {
  cliProgram
    .version(packageVersion, '-v --version');
  commandOptions.map((command) => setupCommandOption(command, cliProgram));

  cliProgram.parse(process.argv);
  validateArgs(cliProgram);
};

const validateArgs = (cliProgram: program.CommanderStatic) => {
  if (cliProgram.movies && cliProgram.series) {
    // Use a renderer function that renders chalk.red console.log
    renderErrorString(ERROR_MOVIE_AND_SERIES_ARGS);
    process.exit();
  }
};

const setupCommandOption = (command: CommandOption, cliProgram: program.CommanderStatic) =>
cliProgram.option(`${command.short}, ${command.full}`, command.description);
