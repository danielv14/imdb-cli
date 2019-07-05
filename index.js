#!/usr/bin/env node
const clear = require('clear');
const inquirer = require('inquirer');
const program = require('commander');
const { IMDb } = require('./IMDb');
const { QueryHelper } = require('./queryHelper');
const pkg = require('./package');

const inputError = 'Please enter a query to search for...';

program
  .version(pkg.version, '-v --version')
  .option('-p, --plot', 'Show plot in search result')
  .option(
    '-t, --title [title]',
    'Search by a specific title. If omitted the program will prompt you for a title to search for'
  )
  .option('-m, --movies', 'Search by movies only. Cannot be used alongside "series" parameter')
  .option('-s --series', 'Search by series only. Cannot be used alongside "movie" parameter')
  .parse(process.argv);

if (program.movies && program.series) {
  console.log('Cannot use both "movie" and "series" parameter together.');
  process.exit();
}

// setup of question
const question = [
  {
    type: 'input',
    name: 'searchString',
    message: 'What do you want to search for?\n',
    validate: value => (value.length ? true : inputError)
  }
];

// clear the terminal window
clear();

// display colorful IMDb header
IMDb.displayHeader();

if (program.title) {
  const query = new QueryHelper(program.title);
  const imdbInstance = new IMDb({
    query: query.getSanitizedQuery(),
    originalquery: program.title,
    showPlot: !!program.plot,
    searchByType: IMDb.determineType({ movies: program.movies, series: program.series })
  });
  imdbInstance.search();
} else {
  // prompt the user for a search string
  inquirer.prompt(question).then(answer => {
    const query = new QueryHelper(answer.searchString);
    const imdbInstance = new IMDb({
      query: query.getSanitizedQuery(),
      originalquery: answer.searchString,
      showPlot: !!program.plot,
      searchByType: IMDb.determineType({ movies: program.movies, series: program.series })
    });
    imdbInstance.search();
  });
}
