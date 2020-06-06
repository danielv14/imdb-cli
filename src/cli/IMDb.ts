import ora from 'ora';
import {
  getFullSeriesFromId,
  getFullSeriesFromTitle,
  getItemsByIds,
  searchByQuery,
  searchByQueryAndType,
} from '../lib/omdbApi';
import { IMDbCliInterface } from '../types/imdb';
import { FormattedItem, Item } from '../types/item';
import {
  SearchResultSortColumn,
  SearchResultType,
} from '../types/searchResult';
import { isIMDbId } from '../utils/isIMDbId';
import { calculateSeriesAverageScore } from '../utils/series';
import { availableColumnsToSort } from '../utils/sortByColumn';
import { getSortedSearchResult } from '../utils/sortItems';
import { getFormattedItem } from './mappings/formattedItem';
import { getFormattedSeriesScore } from './mappings/seriesScore';
import * as renderer from './renderer/renderer';

/**
 * Class to handle scraping of IMDb
 *
 * @class IMDb
 */
export class IMDb implements IMDbCliInterface {

  public query: string;
  public showPlot: boolean;
  public searchByType: SearchResultType;
  public limitPlot: number;
  public sortColumn: SearchResultSortColumn;

  constructor({
    query = '',
    showPlot = false,
    searchByType = SearchResultType.All,
    limitPlot = 40,
    sortColumn = SearchResultSortColumn.None,
  }) {
    this.query = query;
    this.showPlot = showPlot;
    this.searchByType = searchByType;
    this.limitPlot = limitPlot;
    this.sortColumn = sortColumn;
  }

  set searchQuery(query: any) {
    this.query = query;
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
    if (availableColumnsToSort.includes(this.sortColumn)) {
      renderer.renderTable(getSortedSearchResult(result, this.sortColumn));
      return;
    }
    renderer.renderTable(result);
    return;
  }

  /**
   * Get search result promise by query.
   * Method will sanitize the input query
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
        const results = await getItemsByIds(itemsByQuery.map((res) => res.imdbID));
        searchResult = results.map(
          (result: Item) => getFormattedItem(result, this.showPlot, this.limitPlot),
        ) as FormattedItem[];
      } else {
        searchResult = itemsByQuery.map((result: Item) => getFormattedItem(result, false, this.limitPlot));
      }
      spinner.stop();
      this.renderSearchResults(searchResult);

    } catch (e) {
      spinner.stop();
      renderer.renderErrorInfo('Program exit with error', e);
    }
  }

  public async getSeriesInfo(): Promise<void> {
    const spinner = ora('Searching IMDb for series to calculate average season score. Please wait...').start();
    try {
      const fullSeries = isIMDbId(this.query) ?
        await getFullSeriesFromId(this.query) :
        await getFullSeriesFromTitle(this.query);

      if (!fullSeries || !fullSeries.seasons.length) {
        renderer.renderErrorString(`\nCould not find a series matching '${this.query}'. Please try again.`);
        process.exit();
      }
      const seriesAverage = calculateSeriesAverageScore(fullSeries);
      spinner.stop();
      renderer.renderTable(getFormattedSeriesScore(seriesAverage));
    } catch (e) {
      spinner.stop();
      renderer.renderErrorInfo('Program exit with error', e);
    }
  }
}
