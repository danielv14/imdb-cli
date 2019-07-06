import orderBy from 'lodash/orderBy';

import { ISortObject } from './interfaces';

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
export const sortByColumn = ({ items, column, order }: ISortObject) => orderBy(items, [column], [order]);
