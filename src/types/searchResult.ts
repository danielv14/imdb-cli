export interface Item {
  Title: string;
  Year: string;
  Type: string;
  Plot?: string;
  imdbID: string;
}

export interface FullItem extends Item {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Rating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface Episode {
  Title: string;
  Released: string;
  Episide: string;
  imdbRating: string;
  imdbId: string;
}

export interface Season {
 Title: string;
 Season: string;
 totalSeasons: string;
 Episodes: Episode[];
 Response: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

export interface FormattedItem {
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
  items: FormattedItem[];
  column: string;
  order: SearchResultSortOrder;
}

export const SortOrder = {
   [SearchResultSortColumn.Title]: 'Title',
   [SearchResultSortColumn.Year]: 'Year',
   [SearchResultSortColumn.None]: 'None',
 };
