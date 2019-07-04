#!/usr/bin/env node
const clear = require('clear');
const inquirer = require('inquirer');
var program = require('commander');
const { IMDb } = require('./IMDb');
const { queryHelper } = require('./queryHelper');
const pkg = require('./package')

const inputError = 'Please enter a query to search for...';

 
program
  .version(pkg.version)
  .option('-P, --plot', 'Show plot in search result')
  .option('-M, --movies', 'Search by movies only. Cannot be used alongside "series" parameter')
  .option('-S --series', 'Search by series only. Cannot be used alongside "movie" parameter')
  .parse(process.argv);

if (program.movies && program.series) {
  console.log('Cannot use both "movie" and "series" parameter together.');
  return;
}

// setup of question
const question = [
  {
    type: 'input',
    name: 'searchString',
    message: 'What do you want to search for?\n',
    validate: (value) => value.length ? true : inputError
  }
]

// clear the terminal window
clear();

// display colorful IMDb header
IMDb.displayHeader();

// prompt the user for a search string
inquirer.prompt(question).then((answer) => {
  const query = new queryHelper(answer.searchString);
  const imdbInstance = new IMDb({
    query: query.getSanitizedQuery(),
    originalquery: answer.searchString,
    showPlot: !!program.plot,
    searchByType: IMDb.determineType({movies: program.movies, series: program.series})
  });
  imdbInstance.search();  
})