const request = require('request');
const cheerio = require('cheerio');
const ora = require('ora');
var tab = require('table-master');
const chalk = require('chalk');
const figlet = require('figlet');



const { queryHelper } = require('./queryHelper');

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
    this.url = `http://www.imdb.com/search/title?title=${this.query}`;
    this.results = [];
    this.outputColor = chalk.hex('#f3ce13');
  }

  static displayHeader() {
    var imdbColor = chalk.hex('#f3ce13');
    console.log(imdbColor(figlet.textSync('IMDb')));
  }
  
  log() {
    console.log(`The query is: ${this.query}`);
    console.log(`The url is: ${this.url}`);
    console.log('results is ${this.results}')
  }

  scrape() {
    const spinner = ora('Searching IMDb. Please wait...').start();    
    request(this.url, (error, response, body) => {
      
      if (!error) {

        let $ = cheerio.load(body);

        $('.lister-item-header a').each((index, value) => {
          // cache href
          let href = $(value).attr('href');
          this.results.push({
            'title': $(value).text(),
            'year': $(value).next().text().replace(/\D/g, ''),
            'imdbID': this.outputColor(queryHelper.getIMDbID(href))
          });
          // stop the loop after 10 items
          return index < 14;
        });

        spinner.stop();        
        
        console.table(this.results);

      } else {
        spinner.stop();        
        console.log(`Program exit with error: ${error}`);
      }
    });
  }
}