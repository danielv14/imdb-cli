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

export enum SearchResultType {
  Movies = 'movie',
  Series = 'series',
  All =  'all',
}

export enum SearchResultSortColumn {
 Title = 'title',
 Year = 'year',
 None = 'none',
}

export enum SearchResultSortOrder {
  Ascending = 'asc',
  Descending = 'desc',
 }

export interface SortObject {
  items: FormattedSearchResult[];
  column: string;
  order: SearchResultSortOrder;
}

export const SortOrder = {
   [SearchResultSortColumn.Title]: 'Title',
   [SearchResultSortColumn.Year]: 'Year',
   [SearchResultSortColumn.None]: 'None',
 };
