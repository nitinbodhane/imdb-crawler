const express = require('express');
const router = express.Router();
const movieService = require('../services/index');
const url = require('url');
const config = require('config');

/* GET home page. */
router.get('/movies', function(req, res, next) {
  const options = {
    baseurl: req.headers.host + url.parse(req.originalUrl).pathname,
    count: req.query.count,
    fields: req.query.fields,
    sort: req.query.sort,
  };

  movieService.getMovie(options, async (err, data) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
});

module.exports = router;
