import { FormattedItem } from './searchResult';

export interface IMDbProperties {
  query: string;
  originalQuery: string;
  results: FormattedItem[];
  outputColor: (text: string) => string;
  showPlot: boolean;
  searchByType: string;
  limitPlot: number;
  sortColumn?: string;
}
