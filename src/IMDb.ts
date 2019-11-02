const ora = require('ora');
// eslint-disable-next-line no-unused-vars
const tab = require('table-master');
const chalk = require('chalk');
const figlet = require('figlet');
const axios = require('axios');
const { sanitizeQuery, sortByColumn } = require('./utils');

import { IMDbProperties } from './types/imdb';
import {
  FormattedItem,
  FullItem,
  Item,
  SearchResultSortColumn,
  SearchResultSortOrder,
  SearchResultType,
  SortObject,
  SortOrder,
} from './types/searchResult';

import { getItemById, getItemsByIds, searchByQuery, searchByQueryAndType } from './omdbApi';
import { sanitizeQuery, sortByColumn, truncate } from './utils';

/**
 * Class to  handle scraping of IMDb
 *
 * @class IMDb
 */
class IMDb implements IMDbProperties {

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
  public static determineType({ movies, series }: { [key: string]: boolean }): SearchResultType {
    if (movies) {
      return SearchResultType.Movies;
    }
    if (series) {
      return SearchResultType.Series;
    }
    return SearchResultType.All;
  }
  public query: string;
  public originalQuery: string;
  public results: FormattedItem[];
  public outputColor: (text: string) => string;
  public showPlot: boolean;
  public searchByType: SearchResultType;
  public limitPlot: number;
  public sortColumn: SearchResultSortColumn;
  /**
   * Creates an instance of IMDb.
   * @param {string} query - search query
   * @param {boolean} [showPlot=false] determine if plot is to be shown with search result
   * @param {string} [searchByType=null] Search by type: movies or series
   * @param {integer} [limitPlot=40] Amount to limit plot to before it truncates
   * @param {string} [sortColumn=SearchResultSortColumn.None] Specify a column to sort by. Supports 'title' or 'year'
   */
  constructor({
    query = '',
    showPlot = false,
    searchByType = SearchResultType.All,
    limitPlot = 40,
    sortColumn = SearchResultSortColumn.None,
  }) {
    this.query = sanitizeQuery(query);
    this.originalQuery = query;
    this.results = [];
    this.outputColor = chalk.hex('#f3ce13');
    this.showPlot = showPlot;
    this.searchByType = searchByType;
    this.limitPlot = limitPlot;
    this.sortColumn = sortColumn;
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
    } else if (this.availableColumnsToSort().includes(this.sortColumn)) {
      console.table(this.getSortedSearchResult());
    } else {
      console.table(this.results);
    }
  }

  /**
   * Get a sorted array of the search result
   */
  public getSortedSearchResult(): SortObject {
    const orderToSortBy = this.sortColumn === SearchResultSortColumn.Year ?
    SearchResultSortOrder.Descending
    : SearchResultSortOrder.Ascending;
    return sortByColumn({
      items: this.results,
      column: SortOrder[this.sortColumn],
      order: orderToSortBy,
    });
  }

  /**
   * Get available values to sort by
   * @returns {Array}
   */
  public availableColumnsToSort(): string[] {
    return [SearchResultSortColumn.Year, SearchResultSortColumn.Title];
  }

  /**
   * Get search result promise by query
   * @param {String} query
   * @returns {Promise}
   */
  public async getSearchResult(query: string): Promise<Item[]> {
    if (this.searchByType === SearchResultType.All) {
      return searchByQuery(query);
    }
    return searchByQueryAndType(query, this.searchByType);
  }

  /**
   * Get item for a given imdb id
   * @param {String} imdbId
   */
  public async getItemByIMDbId(imdbId: string): Promise<FullItem> {
    const item = await getItemById(imdbId);
    return item;
  }

  /**
   * Get multiple item for a given array of imdb ids
   * @param {Array} imdbId
   */
  public async getFullItemsByIMDBIds(imdbIds: string[]): Promise<FullItem[]> {
    const items = await getItemsByIds(imdbIds);
    return items as FullItem[];
  }

  /**
   * Get a formatted search result to display from SearchResult data
   * @param {Object} input
   * @param {Boolean} includePlot Determine if plot should be included in the formatted result
   * @returns {FormattedItem}
   */
  public getFormattedSearchResult(input: Item, includePlot: boolean = false): FormattedItem {
    const result: FormattedItem = {
      'Title': input.Title,
      'Year': input.Year,
      'Type': input.Type,
      'IMDb ID': this.outputColor(input.imdbID),
    };
    if (includePlot && input.Plot) {
      result.Plot = truncate(input.Plot, this.limitPlot);
    }
    return result;
  }

  /**
   * Perform search for movies/series
   */
  public async search(): Promise<void> {
    const spinner = ora('Searching IMDb. Please wait...').start();
    try {
      const itemsByQuery = await this.getSearchResult(this.query);
      if (!itemsByQuery) {
        this.renderSearchResults();
        process.exit();
      }
      if (this.showPlot) {
        const results = await this.getFullItemsByIMDBIds(itemsByQuery.map((res) => res.imdbID));
        const searchResult = results.map(
          (result: Item) => this.getFormattedSearchResult(result, this.showPlot),
        );
        this.createSearchResult(searchResult);
      } else {
        const searchResult = itemsByQuery.map((result: Item) => this.getFormattedSearchResult(result));
        this.createSearchResult(searchResult);
      }
      spinner.stop();
      this.renderSearchResults();

    } catch (e) {
      spinner.stop();
      console.log(`Program exit with error: ${chalk.red(e)}`);
    }
  }
}

export default IMDb;
