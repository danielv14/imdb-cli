const request = require('request');
const cheerio = require('cheerio');
const ora = require('ora');
const tab = require('table-master');
const chalk = require('chalk');
const figlet = require('figlet');



const { queryHelper } = require('./queryHelper');

/**
 * Class to  handle scraping of IMDb
 * 
 * @class IMDb
 */
exports.IMDb = class {
  
  /**
   * Creates an instance of IMDb.
   * @param {string} query - search query that has been sanitized
   * @param {string} originalQuery - The original search query  
  */
  constructor(query, originalQuery) {
    this.query = query;
    this.originalQuery = originalQuery;
    this.url = `http://www.imdb.com/search/title?title=${this.query}`;
    this.results = [];
    this.outputColor = chalk.hex('#f3ce13');
  }

  
  /**
   * Static method to display IMDB header for the CLI
   * 
   * @static
   */
  static displayHeader() {
    var imdbColor = chalk.hex('#f3ce13');
    console.log(imdbColor(figlet.textSync('IMDb')));
  }

  
  /**
   * Log the query, url and results to the console
   * 
   */
  log() {
    console.log(`The query is: ${this.query}`);
    console.log(`The url is: ${this.url}`);
    console.log(`results is ${this.results}`);
  }

  
  /**
   * Push to results array
   * 
   * @param {any} title 
   * @param {any} year 
   * @param {any} imdbID 
   */
  createSearchResult(title, year, imdbID) {
    this.results.push({title, year, imdbID});
  } 


  /**
   * Render either a table with search results 
   * or a message of no search results were found
   */
  renderSearchResults() {
    if (Object.keys(this.results).length === 0) {
      console.log(chalk.red(`Could not find any search results for "${this.originalQuery}". Please try again.`));
    } else {
      console.table(this.results);
    }
  }
  
  /**
   * Perform the scrape of imdb to gather search results
   * 
   */
  scrape() {
    const spinner = ora('Searching IMDb. Please wait...').start();    
    request(this.url, (error, response, body) => {
      
      if (!error) {

        let $ = cheerio.load(body);

        $('.lister-item-header a').each((index, value) => {
          // create variables to be pushed as search result
          let title = $(value).text();
          let year = $(value).next().text().replace(/\D/g, '');
          let imdbID = this.outputColor(queryHelper.getIMDbID($(value).attr('href')));
          
          this.createSearchResult(title, year, imdbID);

          // stop the loop after 15 items
          return index < 14;
        });

        spinner.stop();        
        this.renderSearchResults();

      } else {
        spinner.stop();        
        console.log(`Program exit with error: ${error}`);
      }
    });
  }
}