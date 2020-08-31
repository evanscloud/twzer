const Table = require('cli-table');

module.exports = (url, simple) => {
  if(simple) {
    console.log(url);
  } else {
    let table = new Table({
      style: {head: ['green'], border: ['white']},
    });

    table.push(
      { 'LINK:': url }
    );

    console.log('');
    console.log(table.toString());
    console.log('');
  }
}
