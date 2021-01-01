const axios = require('axios');
const config = require('config');
const { URL } = require('url');
const https = require('https');
var apiInstance;
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false // This will allow to skip CA authority check.
});

module.exports = function getApiInstance (token) {
  let baseUrl = new URL(config.get('URL_TO_BE_CRAWLED'));

  apiInstance = axios.create({
    baseURL: baseUrl + '/search/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'gzip, deflate'
    },
    httpsAgent: httpsAgent
  });
  return apiInstance;
};
