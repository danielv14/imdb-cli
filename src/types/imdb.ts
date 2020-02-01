import { Chalk } from 'chalk';
import { FormattedItem, FullItem, Item } from './item';
import { SearchResultSortColumn } from './searchResult';
import { FormattedAverageSeason } from './season';
import { SeriesAverageScore } from './series';

interface IMDbCLIProperties {
  query: string;
  outputColor: (text: string) => string;
  showPlot: boolean;
  searchByType: string;
  limitPlot: number;
  sortColumn?: string;
}

export interface IMDbCLI extends IMDbCLIProperties {
  searchQuery: (query: any) => void;
  renderSearchResults: (result?: FormattedItem[]) => void;
  getSortedSearchResult: (result: FormattedItem[]) => FormattedItem[];
  availableColumnsToSort: SearchResultSortColumn[];
  getSearchResult: (query: string) => Promise<Item[]>;
  getItemByIMDbId: (imdbId: string) => Promise<FullItem>;
  getFullItemsByIMDBIds: (imdbIds: string[]) => Promise<FullItem[]>;
  getFormattedSearchResult: (input: Item, includePlot: boolean) => FormattedItem;
  getFormattedSeriesScore: (series: SeriesAverageScore) => FormattedAverageSeason[];
  search: () => Promise<void>;
  scoreColor: (score: number, average: number) => Chalk;
  seriesInfo: () => Promise<void>;
}
