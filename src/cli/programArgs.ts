import program from 'commander';
import { renderErrorString } from './renderer/renderer';
import { CommandOption, commandOptions } from './settings/commands';
import { packageVersion } from './settings/version';

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
    renderErrorString(`Cannot use both "movie (-m)" and "series (-s)" parameter together.`);
    process.exit();
  }
};

const setupCommandOption = (command: CommandOption, cliProgram: program.CommanderStatic) =>
cliProgram.option(`${command.short}, ${command.full}`, command.description);
