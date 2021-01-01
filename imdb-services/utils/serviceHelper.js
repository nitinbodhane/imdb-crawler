const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// const URL = "https://www.imdb.com/search/title?count=10&groups=top_1000&sort=user_rating ";

async function crawlImdb(URL) {
  try {
    /* Read a html document, parse it and store the data into json file */
    axios.get(URL)
      .then(function (response) {
        let arr = [];
        /* Loading html body from given url */
        let $ = cheerio.load(response.data);

        /* Traversing for each block of movie */
        $('.lister-list .lister-item.mode-advanced').each(function(index, element) {
          let movieObj = {
            userRating: {}
          };
          movieObj.name = $(this).find('h3.lister-item-header a').text();
          movieObj.year = $(this).find('h3.lister-item-header a').next().text();

          movieObj.duration = $(this).find('P.text-muted .runtime').text();
          movieObj.genre = $(this).find('P.text-muted .genre').text().trim();

          movieObj.imdbRating = $(this).find('.inline-block.ratings-imdb-rating strong').text();
          movieObj.userRating.ratingValue = $(this).find('.rating-rating .value').text();
          movieObj.userRating.bestRating = $(this).find('.ratingValue .grey').text() || '10';

          movieObj.metaScore = $(this).find('.metascore.favorable').text().trim();

          arr.push(movieObj);
        });

        /* Write a movie data into json file */
        fs.writeFile('data/data.json', JSON.stringify(arr), function (err) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("Movie data has been loaded in to json file successfully");
          }
        });
        return true;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
    } catch (err) {
      return err;
    }
  }

function queryFields (fields) {

  return '';
}

module.exports = {
  'crawlImdb': crawlImdb,
  'queryFields': queryFields
}