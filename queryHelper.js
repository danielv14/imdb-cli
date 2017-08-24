/**
 * Manipulate queries and strings
 * 
 * @class queryHelper
 */
exports.queryHelper = class {


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
}