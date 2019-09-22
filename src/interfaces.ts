export interface IMDbProperties {
  query: string;
  originalQuery: string;
  baseUrl: string;
  results: IFormattedSearchResult[];
  outputColor: (text: string) => string;
  showPlot: boolean;
  searchByType: string;
  limitPlot: number;
  sortColumn?: string;
}

export interface ISortObject {
  items: any[];
  column: string;
  order: any;
}

export interface ISearchResult {
  Title: string;
  Year: string;
  Type: string;
  Plot?: string;
  imdbID: string;
}

export interface IFormattedSearchResult {
  Title: string;
  Year: string;
  Type: string;
  Plot?: string;
  'IMDb ID': string;
}

export interface IMovieOrSeries {
  movies?: boolean;
  series?: boolean;
}
