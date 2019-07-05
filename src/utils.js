/**
 * Encode a string as a URI component
 * @param {String} query to encode
 * @returns {String}
 */
const sanitizeQuery = query => encodeURIComponent(query);

exports.sanitizeQuery = sanitizeQuery;
