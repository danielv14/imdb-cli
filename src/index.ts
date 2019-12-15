#!/usr/bin/env node
const path = require('path');
// set path of dotenv to make the CLI gather .env file when called from outside project root folder
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const clear = require('clear');
const inquirer = require('inquirer');
const program = require('commander');
const IMDb = require('./IMDb').default;
const pkg = require('../package');
import { processProgramArgs } from './cli/programArgs';
import { inquirerPromptQuestion } from './cli/settings/inquirerPromptQuestion';

processProgramArgs(program);

// clear the terminal window
clear();

// display colorful IMDb header
IMDb.displayHeader();

if (program.title) {
  const imdbInstance = new IMDb({
    query: program.title,
    showPlot: !!program.plot,
    limitPlot: program.limitPlot,
    sortColumn: program.orderBy,
    searchByType: IMDb.determineType({ movies: program.movies, series: program.series }),
  });
  if (program.info) {
    imdbInstance.seriesInfo();
  } else {
    imdbInstance.search();
  }
} else {
  // prompt the user for a search string
  inquirer.prompt(inquirerPromptQuestion).then((answer: any) => {
    const imdbInstance = new IMDb({
      query: answer.searchString,
      showPlot: !!program.plot,
      limitPlot: program.limitPlot,
      sortColumn: program.orderBy,
      searchByType: IMDb.determineType({ movies: program.movies, series: program.series }),
    });
    imdbInstance.search();
  });
}
