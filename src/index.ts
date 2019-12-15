#!/usr/bin/env node
const path = require('path');
// set path of dotenv to make the CLI gather .env file when called from outside project root folder
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const clear = require('clear');
const inquirer = require('inquirer');
const program = require('commander');
const pkg = require('../package');
import { IMDb } from './cli/IMDb';
import { processProgramArgs } from './cli/programArgs';
import { renderCLIHeader } from './cli/renderer/renderer';
import { inquirerPromptQuestion } from './cli/settings/inquirerPromptQuestion';

processProgramArgs(program);

// clear the terminal window
clear();

// display colorful IMDb header
renderCLIHeader('IMDb CLI', '#f3ce13');

const imdbInstance = new IMDb({
  showPlot: !!program.plot,
  limitPlot: program.limitPlot,
  sortColumn: program.orderBy,
  searchByType: IMDb.determineType({ movies: program.movies, series: program.series }),
});
if (program.title) {
  imdbInstance.searchQuery = program.title;
  if (program.info) {
    imdbInstance.seriesInfo();
  } else {
    imdbInstance.search();
  }
} else {
  // prompt the user for a search string
  inquirer.prompt(inquirerPromptQuestion).then((answer: any) => {
  imdbInstance.searchQuery = answer;
  imdbInstance.search();
  });
}
