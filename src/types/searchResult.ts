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
