import ora from 'ora';
import {
  getFullSeriesFromQuery,
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
import { getAllEpisodeScores } from '../utils/getAllEpisodeScores';
import { calculateSeriesAverageScore } from '../utils/series';
import { getSortedSearchResult } from '../utils/sorting/sortItems';
import { getFormattedItem } from './mappings/formattedItem';
import { getFormattedSeriesScore } from './mappings/seriesScore';
import * as renderer from './renderer/renderer';
import { cliConfig } from './settings/cliConfig';

export class IMDb implements IMDbCliInterface {

  public query: string;
  public showPlot: boolean;
  public searchByType: SearchResultType;
  public limitPlot: number;
  public sortColumn: SearchResultSortColumn;

  constructor({
    query = '',
    showPlot = cliConfig.showPlotDefault,
    searchByType = cliConfig.searchTypeDefault,
    limitPlot = cliConfig.plotLimitDefault,
    sortColumn = cliConfig.sortColumnOrderDefault,
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

  public renderSearchResults(result?: FormattedItem[]): void {
    if (!result) {
      renderer.renderErrorString(`\nCould not find any search results for '${this.query}'. Please try again.`);
      return;
    }
    if (cliConfig.availableColumnsToSort.includes(this.sortColumn)) {
      renderer.renderTable(getSortedSearchResult(result, this.sortColumn));
      return;
    }
    renderer.renderTable(result);
    return;
  }

  public async getSearchResult(query: string): Promise<Item[]> {
    if (this.searchByType === SearchResultType.All) {
      return searchByQuery(query);
    }
    return searchByQueryAndType(query, this.searchByType);
  }

  public async run(): Promise<void> {
    const spinner = ora('Searching IMDb. Please wait...').start();
    try {
      const itemsByQuery = await this.getSearchResult(this.query);
      if (!itemsByQuery) {
        this.renderSearchResults();
        process.exit();
      }
      let searchResult;
      if (this.showPlot) {
        const fullItems = await getItemsByIds(itemsByQuery.map((res) => res.imdbID));
        searchResult = fullItems.map(
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
      const fullSeries = await getFullSeriesFromQuery(this.query);
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

  public async renderEpisodeGraph(): Promise<void> {
    const spinner = ora('Searching IMDb for series to render episode graph for. Please wait...').start();
    try {
      const fullSeries = await getFullSeriesFromQuery(this.query);
      if (!fullSeries || !fullSeries.seasons.length) {
        renderer.renderErrorString(`\nCould not find a series matching '${this.query}'. Please try again.`);
        process.exit();
      }
      const allEpisodes = getAllEpisodeScores(fullSeries);
      spinner.stop();
      if (allEpisodes.length > cliConfig.episodeGraphLimit) {
        renderer.renderErrorString('Too many episodes to display in a ratings graph.');
        renderer.renderText('\nTry using the "-i" flag instead of "-g" to display average season scores in a list.');
        return;
      }
      renderer.renderText(`Ratings graph for series "${fullSeries.title}"\n`);
      // Pad episode count to try and scale ascii chart from 1-10
      renderer.renderAsciiChart([0, ...allEpisodes]);
    } catch (e) {
      spinner.stop();
      renderer.renderErrorInfo('Program exit with error', e);
    }
  }
}
