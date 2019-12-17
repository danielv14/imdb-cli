import program from 'commander';
import { renderCommandError } from './renderer/renderer';
import { CommandErrorText, CommandOption, commandOptions } from './settings/commands';
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
    renderCommandError(CommandErrorText.MovieAndSeriesFlag);
    process.exit();
  }
};

const setupCommandOption = (command: CommandOption, cliProgram: program.CommanderStatic) =>
cliProgram.option(`${command.short}, ${command.full}`, command.description);
