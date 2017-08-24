#!/usr/bin/env node
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('inquirer');

const { IMDb } = require('./IMDb');
const { queryHelper } = require('./queryHelper');

// imdb color
const imdbChalk = chalk.hex('#f3ce13');

const inputError = 'Please enter a query to search for...';


// function to display the CLI's header
const displayHeader = () => console.log(imdbChalk(figlet.textSync('IMDb')));

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
displayHeader();

// prompt the user for a search string
inquirer.prompt(question).then((answer) => {
  let query = new queryHelper(answer.searchString);
  let result = new IMDb(query.getSanitizedQuery());
  // result.createURL();
  result.log();
})