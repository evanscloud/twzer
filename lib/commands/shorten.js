const bitly = require('../clients/bitly');

const shorten = function(program) {
  program
    .command('shorten <link>')
    .alias('sh')
    .description('Shorten a long link.')
    .option('-s, --simple', 'Just return the link with no aditional characters')
    .action( (link, option) => {
      bitly.shorten(link, option);
    });
};

module.exports = shorten;
