const ora = require('ora');
import {
  getFullSeriesFromTitle,
  getItemById,
  getItemsByIds,
  searchByQuery,
  searchByQueryAndType,
} from '../lib/omdbApi';
import { calculateAverage, calculateSeriesAverageScore, sanitizeQuery, sortByColumn, truncate } from '../lib/utils';
import { IMDbProperties } from '../types/imdb';
import {
  FormattedAverageSeason,
  FormattedItem,
  FullItem,
  Item,
  SearchResultSortColumn,
  SearchResultSortOrder,
  SearchResultType,
  SortOrder,
} from '../types/searchResult';
import { SeriesAverageScore } from '../types/series';
import * as renderer from './renderer/renderer';

/**
 * Class to  handle scraping of IMDb
 *
 * @class IMDb
 */
export class IMDb implements IMDbProperties {

  /**
   * Static method to display IMDB header for the CLI
   *
   * @static
   */
  public static displayHeader() {
    renderer.renderCLIHeader('IMDb CLI', '#f3ce13');
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
    this.query = query;
    this.outputColor = renderer.hexColor('#f3ce13');
    this.showPlot = showPlot;
    this.searchByType = searchByType;
    this.limitPlot = limitPlot;
    this.sortColumn = sortColumn;
  }

  /**
   * Render either a table with search results
   * or a message of no search results were found
   */
  public renderSearchResults(result?: FormattedItem[]): void {
    if (!result) {
      renderer.renderErrorString(`\nCould not find any search results for '${this.query}'. Please try again.`);
      return;
    }
    if (this.availableColumnsToSort.includes(this.sortColumn)) {
      renderer.renderTable(this.getSortedSearchResult(result));
      return;
    }
    renderer.renderTable(result);
    return;
  }

  /**
   * Get a sorted array of the search result
   */
  public getSortedSearchResult(result: FormattedItem[]) {
    const orderToSortBy = this.sortColumn === SearchResultSortColumn.Year ?
    SearchResultSortOrder.Descending
    : SearchResultSortOrder.Ascending;
    return sortByColumn({
      items: result,
      column: SortOrder[this.sortColumn],
      order: orderToSortBy,
    });
  }

  /**
   * Get available values to sort by
   * @returns {Array}
   */
  get availableColumnsToSort(): SearchResultSortColumn[] {
    return [SearchResultSortColumn.Year, SearchResultSortColumn.Title];
  }

  /**
   * Get search result promise by query.
   * Method will sanitize the input query
   * @param {String} query
   * @returns {Promise}
   */
  public async getSearchResult(query: string): Promise<Item[]> {
    const sanitizedQuery = sanitizeQuery(query);
    if (this.searchByType === SearchResultType.All) {
      return searchByQuery(sanitizedQuery);
    }
    return searchByQueryAndType(sanitizedQuery, this.searchByType);
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

  public getFormattedSeriesScore(series: SeriesAverageScore): FormattedAverageSeason[] {
    const averageSeasonScore = calculateAverage(series.Seasons.map((season) => season.AverageScore));
    const formattedSeriesScore = series.Seasons.map((season) => {
      const color = this.scoreColor(season.AverageScore, averageSeasonScore);
      return {
        [`${series.Title} season`]: `Season ${season.SeasonNumber}`,
        'IMDb score': color(season.AverageScore + ''),
      };
    });
    return formattedSeriesScore;
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
      let searchResult;
      if (this.showPlot) {
        const results = await this.getFullItemsByIMDBIds(itemsByQuery.map((res) => res.imdbID));
        searchResult = results.map(
          (result: Item) => this.getFormattedSearchResult(result, this.showPlot),
        ) as FormattedItem[];
      } else {
        searchResult = itemsByQuery.map((result: Item) => this.getFormattedSearchResult(result));
      }
      spinner.stop();
      this.renderSearchResults(searchResult);

    } catch (e) {
      spinner.stop();
      renderer.renderErrorInfo('Program exit with error', e);
    }
  }

  public scoreColor(score: number, average: number) {
    let diff;
    const diffThreshold = 0.5;
    if (score < average) {
      diff = average - score;
      return diff > diffThreshold ?
        renderer.getRenderColor(renderer.RenderColor.Error) :
        renderer.getRenderColor(renderer.RenderColor.Neutral);
    }
    diff = score - average;
    return diff > diffThreshold ?
      renderer.getRenderColor(renderer.RenderColor.Success) :
      renderer.getRenderColor(renderer.RenderColor.Neutral);
  }

  public async seriesInfo(): Promise<void> {
    const spinner = ora('Searching IMDb for series to calculate average season score. Please wait...').start();
    try {
      const fullSeries = await getFullSeriesFromTitle(this.query);
      if (!fullSeries || !fullSeries.seasons.length) {
        renderer.renderErrorString(`\nCould not find a series matching '${this.query}'. Please try again.`);
        process.exit();
      }
      const seriesAverage = calculateSeriesAverageScore(fullSeries);
      spinner.stop();
      renderer.renderTable(this.getFormattedSeriesScore(seriesAverage));
    } catch (e) {
      spinner.stop();
      renderer.renderErrorInfo('Program exit with error', e);
    }
  }
}
