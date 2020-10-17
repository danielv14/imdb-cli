import orderBy from 'lodash/orderBy';
import { SortObject  } from '../../types/searchResult';

/**
 * Get a sorted array of objects sorted by object key value and by asc or desc order
 */
export const sortByColumn = ({ items, column, order }: SortObject) => {
  return orderBy(items, [column], [order]);
};
