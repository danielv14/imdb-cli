#!/usr/bin/env node
const clear = require('clear');
const inquirer = require('inquirer');
const program = require('commander');
const IMDb = require('./IMDb').default;
const pkg = require('../package');

const inputError = 'Please enter a query to search for...';

program
  .version(pkg.version, '-v --version')
  .option('-p, --plot', 'Show plot in search result')
  .option(
    '-l, --limit-plot [number]',
    'Limit the amount of characters to be displayed for plot text. If omitted a default amount will be used',
  )
  .option(
    '-t, --title [title]',
    'Search by a specific title. If omitted the program will prompt you for a title to search for',
  )
  .option('-m, --movies', 'Search by movies only. Cannot be used alongside \'series\' parameter')
  .option('-s --series', 'Search by series only. Cannot be used alongside \'movie\' parameter')
  .option('-o, --order-by [column]', 'Sort the search result by a column')
  .parse(process.argv);

if (program.movies && program.series) {
  console.log('Cannot use both \'movie\' and \'series\' parameter together.');
  process.exit();
}

// setup of question
const question = [
  {
    type: 'input',
    name: 'searchString',
    message: 'What do you want to search for?\n',
    validate: (value: string) => (value.length ? true : inputError),
  },
];

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
  imdbInstance.search();
} else {
  // prompt the user for a search string
  inquirer.prompt(question).then((answer: any) => {
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
