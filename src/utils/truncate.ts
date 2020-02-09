/**
 * Truncate text
 * @param {String} text
 * @param {Number} limit
 * @returns {String}
 */
export const truncate = (text: string, limit: number): string => text ? `${text.substring(0, limit)}...` : '';
