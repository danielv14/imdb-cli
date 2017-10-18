#!/usr/bin/env node
const clear = require('clear');
const inquirer = require('inquirer');

const { IMDb } = require('./IMDb');
const { queryHelper } = require('./queryHelper');


const inputError = 'Please enter a query to search for...';


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
  const result = new IMDb(query.getSanitizedQuery(), answer.searchString);
  // result.createURL();
  result.scrape();  
})