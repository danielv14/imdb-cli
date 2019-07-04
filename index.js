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
  .parse(process.argv);


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
    showPlot: !!program.plot
  });
  imdbInstance.search();  
})