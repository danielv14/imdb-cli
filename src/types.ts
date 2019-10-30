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

export interface SortObject {
  items: any[];
  column: string;
  order: any;
}

export interface SearchResult {
  Title: string;
  Year: string;
  Type: string;
  Plot?: string;
  imdbID: string;
}

export interface FormattedSearchResult {
  Title: string;
  Year: string;
  Type: string;
  Plot?: string;
  'IMDb ID': string;
}

export interface MovieOrSeries {
  movies?: boolean;
  series?: boolean;
}
