#!/usr/bin/env node
import clear from 'clear';
import program from 'commander';
import dotenv from 'dotenv';
import path from 'path';
import { processProgramArgs } from './cli/programArgs';
import { CLI_COLOR, renderCLIHeader } from './cli/renderer/renderer';
import { runCLI } from './cli/runCLI';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

processProgramArgs(program);

// clear the terminal window
clear();

// display colorful IMDb header
renderCLIHeader('IMDb CLI', CLI_COLOR );

// Run the cli program
runCLI(program);
