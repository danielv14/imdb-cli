import orderBy from 'lodash/orderBy';
import { SearchResultSortColumn, SortObject  } from '../types/searchResult';

/**
 * Get a sorted array of objects sorted by object key value and by asc or desc order
 * @param {Array} items
 * @param {String} column
 * @param {String} order asc or desc
 */
export const sortByColumn = ({ items, column, order }: SortObject) => {
  return orderBy(items, [column], [order]);
};

export const availableColumnsToSort: SearchResultSortColumn[] =
 [SearchResultSortColumn.Year, SearchResultSortColumn.Title];
