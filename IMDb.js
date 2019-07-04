const ora = require('ora');
const tab = require('table-master');
const chalk = require('chalk');
const figlet = require('figlet');
const axios = require('axios');
require('dotenv').config()

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
  constructor({query, originalQuery}) {
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
    const imdbColor = chalk.hex('#f3ce13');
    console.log(imdbColor(figlet.textSync('IMDb CLI')));
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
   * @param {Array} results Array of result objects to later display
   */
  createSearchResult(results) {
    results.forEach(result => this.results.push(result))
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
   * Get the api key to use for omdb api
   * @returns {String}
   */
  getAPIKey() {
    return process.env.API_KEY;
  }

  /**
   * Get search result promise by query
   * @param {String} query
   * @returns {Promise} 
   */
  getSearchResult(query) {
    return axios.get(`http://www.omdbapi.com?s=${query}&apikey=${this.getAPIKey()}`)
  }
  
  /**
   * Perform search for movies/series
   * 
   */
  async search() {
    const spinner = ora('Searching IMDb. Please wait...').start(); 
    try {
      const { data } = await this.getSearchResult(this.query);
      const searchResult = data.Search.map(result => {
        return {
          'Title': result.Title,
          'Year': result.Year,
          'Type': result.Type,
          'IMDb ID': this.outputColor(result.imdbID)
        }
      })
      spinner.stop()
      this.createSearchResult(searchResult)
      this.renderSearchResults()
    } catch(e) {
      spinner.stop();        
      console.log(`Program exit with error: ${error}`);
    }
  }
}