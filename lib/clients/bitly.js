const Bitly = require('bitly');
const chalk = require('chalk');
const printURL = require('../utils/print-url');
const Table = require('cli-table');

const bitly = new Bitly('13fc4c68a0527ed9cdcc38a020ecf50a6e6b6887');

const protocolCheck = (link) => {

  // Bitly API will return error if url has no protocol
  // ^http[s]?\:\/\/
  if (!(/^[^:]+(?=:\/\/)/).test(link)) {
    return "http://" + link;
  } else {
    return link;
  }

};

const shorten = (link, option) => {
  let verifiedLink = protocolCheck(link);

  bitly.shorten(verifiedLink)
    .then( response => {
      if (response.status_code === 200) {
        printURL(response.data.url, option.simple); 
      } else {
        console.log('');
        console.log(chalk.red('Error occurred:'), response);
        console.log('');
      };
    });
};

const expand = (link, option) => {
  let verifiedLink = protocolCheck(link);

  bitly.expand(verifiedLink)
    .then( response => {
      if (response.data.expand[0].error) {
        console.log('');
        console.log(chalk.red('Error occurred:'), response.data.expand[0]);
        console.log('');
      } else {
        if (response.status_code === 200) {
          printURL(response.data.expand[0].long_url, option.simple);
        } 
      };
    });
};

module.exports = { shorten, expand };
