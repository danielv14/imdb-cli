/**
 * Manipulate queries and strings
 *
 * @class queryHelper
 */
exports.QueryHelper = class {
  /**
   * Creates an instance of queryHelper.
   * @param {string} initialQuery
   * @memberof queryHelper
   */
  constructor(initialQuery) {
    this.query = initialQuery;
  }

  /**
   * returns the query but sanitized
   * replace all spaces with pluses
   * @returns {string}
   */
  getSanitizedQuery() {
    return this.query.replace(/ /g, '+');
  }

  /**
   * Match IMDb ID's from hrefs
   *
   * @static
   * @param {string} href
   * @returns {string} containing IMDb ID
   */
  static getIMDbID(href) {
    return href.match(/tt(.*)[0-9]/g).toString();
  }
};
