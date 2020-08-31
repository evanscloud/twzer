const bitly = require('../clients/bitly');

const expand = function(program) {
  program
    .command('expand <link>')
    .alias('ex')
    .description('Expand a shortened link.')
    .option('-s, --simple', 'Just return the link with no aditional characters')
    .action( (link, option) => {
      bitly.expand(link, option);
    });
};

module.exports = expand;
