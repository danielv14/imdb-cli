const ora = require('ora');
// eslint-disable-next-line no-unused-vars
const tab = require('table-master');
const chalk = require('chalk');
const figlet = require('figlet');
const axios = require('axios');
const capitalze = require('lodash/capitalize');
const config = require('../config');
const { sanitizeQuery, sortByColumn } = require('./utils');

import { IFormattedSearchResult, IMDbProperties, IMovieOrSeries, ISearchResult, ISortObject } from './interfaces';

/**
 * Class to  handle scraping of IMDb
 *
 * @class IMDb
 */
const IMDb = class implements IMDbProperties {

  /**
   * Static method to display IMDB header for the CLI
   *
   * @static
   */
  public static displayHeader() {
    const imdbColor = chalk.hex('#f3ce13');
    console.log(imdbColor(figlet.textSync('IMDb CLI')));
  }

  /**
   * Static method to determine type, i.e movies or series is to be used when creating the IMDb class
   * @param {Boolean} movies
   * @param {Boolean} series
   * @returns {String}
   */
  public static determineType({ movies, series }: IMovieOrSeries) {
    if (movies) {
      return 'movie';
    }
    if (series) {
      return 'series';
    }
    return null;
  }
  public query: string;
  public originalQuery: string;
  public url: string;
  public results: IFormattedSearchResult[];
  public outputColor: (text: string) => string;
  public showPlot: boolean;
  public searchByType: any;
  public limitPlot: number;
  public sortColumn: any;
  /**
   * Creates an instance of IMDb.
   * @param {string} query - search query
   * @param {boolean} [showPlot=false] determine if plot is to be shown with search result
   * @param {string} [searchByType=null] Search by type: movies or series
   * @param {integer} [limitPlot=40] Amount to limit plot to before it truncates
   * @param {string} [sortColumn=null] Specify a column to sort by. Supports 'title' or 'year'
   */
  constructor({ query = '', showPlot = false, searchByType = '', limitPlot = 40, sortColumn = '' }) {
    this.query = sanitizeQuery(query);
    this.originalQuery = query;
    this.url = `http://www.imdb.com/search/title?title=${this.query}`;
    this.results = [];
    this.outputColor = chalk.hex('#f3ce13');
    this.showPlot = showPlot;
    this.searchByType = searchByType;
    this.limitPlot = limitPlot;
    if (sortColumn && this.availableColumnsToSort().includes(sortColumn.toLowerCase())) {
      this.sortColumn = capitalze(sortColumn);
    }
  }

  /**
   * Push to results array
   * @param {Array} results Array of result objects to later display
   */
  public createSearchResult(results: any[]): void {
    results.forEach((result) => this.results.push(result));
  }

  /**
   * Render either a table with search results
   * or a message of no search results were found
   */
  public renderSearchResults(): void {
    if (Object.keys(this.results).length === 0) {
      console.log(chalk.red(`\nCould not find any search results for '${this.originalQuery}'. Please try again.`));
    } else if (this.sortColumn) {
      console.table(this.getSortedSearchResult());
    } else {
      console.table(this.results);
    }
  }

  /**
   * Get a sorted array of the search result
   */
  public getSortedSearchResult(): ISortObject {
    return sortByColumn({
      items: this.results,
      column: this.sortColumn,
      order: this.sortColumn === 'Title' ? 'asc' : 'desc',
    });
  }

  /**
   * Get available values to sort by
   * @returns {Array}
   */
  public availableColumnsToSort(): string[] {
    return ['year', 'title'];
  }

  /**
   * Get the api key to use for omdb api
   * @returns {String}
   */
  public getAPIKey(): string {
    return config.apikey;
  }

  /**
   * Get search result promise by query
   * @param {String} query
   * @returns {Promise}
   */
  public getSearchResult(query: string): Promise<any> {
    if (this.searchByType) {
      return axios.get(`http://www.omdbapi.com?s=${query}&apikey=${this.getAPIKey()}&type=${this.searchByType}`);
    }
    return axios.get(`http://www.omdbapi.com?s=${query}&apikey=${this.getAPIKey()}`);
  }

  public getItemByIMDbId(imdbId: string): Promise<any> {
    return axios.get(`http://www.omdbapi.com?i=${imdbId}&apikey=${this.getAPIKey()}`);
  }

  /**
   *
   * @param {String} text string to truncate
   * @param {Integer} [limit=40] Limit truncation to a specific amount of chars
   */
  public getTruncatedText({ text }: { text?: string }): string {
    if (!text) {
      return '';
    }
    return `${text.substring(0, this.limitPlot)}...`;
  }

  /**
   * Get a formatted search result with plot to display from response object
   * @param {Object} input
   * @returns {Object}
   */
  public getFormattedSearchResultWithPlot(input: ISearchResult): IFormattedSearchResult {
    return {
      'Title': input.Title,
      'Year': input.Year,
      'Type': input.Type,
      'Plot': this.getTruncatedText({ text: input.Plot }),
      'IMDb ID': this.outputColor(input.imdbID),
    };
  }

  /**
   * Get a formatted search result to display from response object
   * @param {Object} input
   * @returns {Object}
   */
  public getFormattedSearchResult(input: ISearchResult): IFormattedSearchResult {
    return {
      'Title': input.Title,
      'Year': input.Year,
      'Type': input.Type,
      'IMDb ID': this.outputColor(input.imdbID),
    };
  }

  /**
   * Perform search for movies/series
   */
  public async search(): Promise<void> {
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
        const fullPromises = data.Search.map((result: any) => this.getItemByIMDbId(result.imdbID));
        const promises = await Promise.all(fullPromises);
        const results = promises.map((result: any) => result.data);
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

export default IMDb;
