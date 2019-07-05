const orderBy = require('lodash/orderBy');

/**
 * Encode a string as a URI component
 * @param {String} query to encode
 * @returns {String}
 */
const sanitizeQuery = query => encodeURIComponent(query);

/**
 * Get a sorted array of objects sorted by object key value and by asc or desc order
 * @param {Array} items
 * @param {String} column
 * @param {String} order asc or desc
 */
const sortByColumn = ({ items, column, order }) => {
  return orderBy(items, [column], [order]);
};

exports.sanitizeQuery = sanitizeQuery;
exports.sortByColumn = sortByColumn;
