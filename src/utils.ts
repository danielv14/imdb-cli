import orderBy from 'lodash/orderBy';
import { SortObject } from './types/searchResult';

/**
 * Encode a string as a URI component
 * @param {String} query to encode
 * @returns {String}
 */
export const sanitizeQuery = (query: string) => encodeURIComponent(query);

/**
 * Get a sorted array of objects sorted by object key value and by asc or desc order
 * @param {Array} items
 * @param {String} column
 * @param {String} order asc or desc
 */
export const sortByColumn = ({ items, column, order }: SortObject) => orderBy(items, [column], [order]);

/**
 * Truncate text
 * @param {String} text
 * @param {Number} limit
 * @returns {String}
 */
export const truncate = (text: string, limit: number): string => text ?  `${text.substring(0, limit)}...` : '';
