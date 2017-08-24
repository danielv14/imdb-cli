/**
 * Class to  handle scraping of IMDb
 * 
 * @class IMDb
 */
exports.IMDb = class {
  
  /**
   * Creates an instance of IMDb.
   * @param {string} query 
  */
  constructor(query) {
    this.query = query;
    this.url = `http://www.imdb.com/find?q=${this.query}&s=tt&ref_=fn_al_tt_mr`;
  }
      
  log() {
    console.log(`The query is: ${this.query}`);
    console.log(`The url is: ${this.url}`);
  }
}