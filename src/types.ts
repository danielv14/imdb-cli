import { FormattedSearchResult } from './types/searchResult';

export interface SortObject {
  items: FormattedSearchResult[];
  column: string;
  order: any;
}

