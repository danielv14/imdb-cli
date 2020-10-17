import { FormattedItem } from '../../types/item';
import { SearchResultSortColumn, SearchResultSortOrder, SortOrder } from '../../types/searchResult';
import { sortByColumn } from './sortByColumn';

export const getSortedSearchResult = (result: FormattedItem[], sortBy: SearchResultSortColumn) => {
  const orderToSortBy = sortBy === SearchResultSortColumn.Year ?
  SearchResultSortOrder.Descending
  : SearchResultSortOrder.Ascending;
  return sortByColumn({
    items: result,
    column: SortOrder[sortBy],
    order: orderToSortBy,
  });
};
