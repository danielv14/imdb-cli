import { FormattedItem } from './item';

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
