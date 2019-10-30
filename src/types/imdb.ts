import { FormattedSearchResult } from './searchResult';

export interface IMDbProperties {
  query: string;
  originalQuery: string;
  baseUrl: string;
  results: FormattedSearchResult[];
  outputColor: (text: string) => string;
  showPlot: boolean;
  searchByType: string;
  limitPlot: number;
  sortColumn?: string;
}
