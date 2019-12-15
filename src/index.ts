#!/usr/bin/env node
const path = require('path');
// set path of dotenv to make the CLI gather .env file when called from outside project root folder
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const clear = require('clear');
import program from 'commander';
import { processProgramArgs } from './cli/programArgs';
import { CLI_COLOR, renderCLIHeader } from './cli/renderer/renderer';
import { runCLI } from './cli/runCLI';

processProgramArgs(program);

// clear the terminal window
clear();

// display colorful IMDb header
renderCLIHeader('IMDb CLI', CLI_COLOR );

// Run the cli program
runCLI(program);
