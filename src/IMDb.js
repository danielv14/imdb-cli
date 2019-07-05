const ora = require('ora');
// eslint-disable-next-line no-unused-vars
const tab = require('table-master');
const chalk = require('chalk');
const figlet = require('figlet');
const axios = require('axios');
const config = require('../config');
const { sanitizeQuery } = require('./utils');

/**
 * Class to  handle scraping of IMDb
 *
 * @class IMDb
 */
exports.IMDb = class {
  /**
   * Creates an instance of IMDb.
   * @param {string} query - search query
   * @param {boolean} [showPlot=false] determine if plot is to be shown with search result
   * @param {string} [searchByType=null] Search by type: movies or series
   * @param {integer} [limitPlot=40] Amount to limit plot to before it truncates
   */
  constructor({ query, showPlot = false, searchByType = null, limitPlot = 40 }) {
    this.query = sanitizeQuery(query);
    this.originalQuery = query;
    this.url = `http://www.imdb.com/search/title?title=${this.query}`;
    this.results = [];
    this.outputColor = chalk.hex('#f3ce13');
    this.showPlot = showPlot;
    this.searchByType = searchByType;
    this.limitPlot = parseInt(limitPlot, 10);
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
   * Static method to determine type, i.e movies or series is to be used when creating the IMDb class
   * @param {Boolean} movies
   * @param {Boolean} series
   * @returns {String}
   */
  static determineType({ movies, series }) {
    if (movies) {
      return 'movie';
    }
    if (series) {
      return 'series';
    }
    return null;
  }

  /**
   * Push to results array
   * @param {Array} results Array of result objects to later display
   */
  createSearchResult(results) {
    results.forEach(result => this.results.push(result));
  }

  /**
   * Render either a table with search results
   * or a message of no search results were found
   */
  renderSearchResults() {
    if (Object.keys(this.results).length === 0) {
      console.log(chalk.red(`\nCould not find any search results for "${this.originalQuery}". Please try again.`));
    } else {
      console.table(this.results);
    }
  }

  /**
   * Get the api key to use for omdb api
   * @returns {String}
   */
  getAPIKey() {
    return config.apikey;
  }

  /**
   * Get search result promise by query
   * @param {String} query
   * @returns {Promise}
   */
  getSearchResult(query) {
    if (this.searchByType) {
      return axios.get(`http://www.omdbapi.com?s=${query}&apikey=${this.getAPIKey()}&type=${this.searchByType}`);
    }
    return axios.get(`http://www.omdbapi.com?s=${query}&apikey=${this.getAPIKey()}`);
  }

  getItemByIMDbId(imdbId) {
    return axios.get(`http://www.omdbapi.com?i=${imdbId}&apikey=${this.getAPIKey()}`);
  }

  /**
   *
   * @param {String} text string to truncate
   * @param {Integer} [limit=40] Limit truncation to a specific amount of chars
   */
  getTruncatedText({ text }) {
    return `${text.substring(0, this.limitPlot)}...`;
  }

  /**
   * Get a formatted search result with plot to display from response object
   * @param {Object} input
   * @returns {Object}
   */
  getFormattedSearchResultWithPlot(input) {
    return {
      Title: input.Title,
      Year: input.Year,
      Type: input.Type,
      Plot: this.getTruncatedText({ text: input.Plot }),
      'IMDb ID': this.outputColor(input.imdbID)
    };
  }

  /**
   * Get a formatted search result to display from response object
   * @param {Object} input
   * @returns {Object}
   */
  getFormattedSearchResult(input) {
    return {
      Title: input.Title,
      Year: input.Year,
      Type: input.Type,
      'IMDb ID': this.outputColor(input.imdbID)
    };
  }

  /**
   * Perform search for movies/series
   */
  async search() {
    const spinner = ora('Searching IMDb. Please wait...').start();
    try {
      const { data } = await this.getSearchResult(this.query);
      // render empty searh result of no search result was found
      if (!data.Search) {
        this.renderSearchResults();
        process.exit();
      }
      if (this.showPlot) {
        // Plot does not exist in response when getting regular search result.
        // Need to fetch the individual search results by imdb id to get their plots
        const fullPromises = data.Search.map(result => this.getItemByIMDbId(result.imdbID));
        const promises = await Promise.all(fullPromises);
        const results = promises.map(result => result.data);
        const searchResult = results.map(this.getFormattedSearchResultWithPlot.bind(this));
        this.createSearchResult(searchResult);
        spinner.stop();
        this.renderSearchResults();
      } else {
        const searchResult = data.Search.map(this.getFormattedSearchResult.bind(this));
        this.createSearchResult(searchResult);
        spinner.stop();
        this.renderSearchResults();
      }
    } catch (e) {
      spinner.stop();
      console.log(`Program exit with error: ${chalk.red(e)}`);
    }
  }
};
