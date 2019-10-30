import { FormattedSearchResult, SearchResultSortColumn, SearchResultSortOrder } from './types/searchResult';

export interface SortObject {
  items: FormattedSearchResult[];
  column: SearchResultSortColumn;
  order: SearchResultSortOrder;
}

