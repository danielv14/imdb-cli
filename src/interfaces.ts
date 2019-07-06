export interface IMDbProperties {
  query: String;
  originalQuery: String;
  url: String;
  results: Array<Object>;
  outputColor: Function;
  showPlot: Boolean;
  searchByType: String;
  limitPlot: number;
  sortColumn?: String;
}

export interface SortObject {
  items: Array<any>;
  column: String;
  order: any;
}

export interface SearchResult {
  Title: String;
  Year: String;
  Type: String;
  Plot?: String;
  imdbID: String
}

export interface FormattedSearchResult {
  Title: String;
  Year: String;
  Type: String;
  Plot?: String;
  'IMDb ID': String
}

export interface MovieOrSeries {
  movies?: Boolean;
  series?: Boolean;
}