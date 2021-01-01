const path = require('path');
const serviceHelper = require(path.resolve(__dirname, '../utils/serviceHelper'));
const config = require('config');
const fs = require('fs');

/**
 * @param {Object} options
 * @param {Object} options.reqUser reqUser
 * @param {Object} options.baseurl baseurl
 * @param {Object} options.rawBody rawBody
 * @param {Function} callback
 */
async function getMovie (options, callback) {
  try {
    // Setting count given by the user
    let count = options.count || 10;
    let sort = options.sort || 'imdbRating';
    let groups = options.groups || 'top_1000';

    /* HTML parsing and preparing json data section starts */
    // Prepare Url to be called with given query parameters
    let url = `${config.get('URL_TO_BE_CRAWLED')}/search/title?count=${count}&groups=top_1000&sort=user_rating`;
    /* Crawling data from the given url and storing into json file */
    await serviceHelper.crawlImdb(url);
    /* Json File created and section ends */

    /* Reading data frm json file */
    let movieData = fs.readFileSync('./data/data.json', {encoding:'utf8'});
    movieData = JSON.parse(movieData);

    /* Sort data */
    movieData = movieData.sort(function(a, b) {
      let field1 = a[sort].toLowerCase(); // ignore upper and lowercase
      let field2 = b[sort].toLowerCase(); // ignore upper and lowercase
      if (field1 < field2) {
        return -1;
      }
      if (field1 > field2) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    /* Sorting ends */

    /* Use fields as where clause */
    // let fields = serviceHelper.queryFields(options.fields);
    // let fields = options.fields.split('&');
    // movieData = movieData.filter(x => {
    //   return x.fields[indx];
    // });
    /* Fields section ends */

    let result = movieData;
    callback(null, {
      data: result
    });
  } catch (err) {
    let error = {
      msg: err.message || err,
      status: 401
    }
    callback(error, null);
  }
}

let movie = {
  'getMovie': getMovie
};

module.exports = movie;