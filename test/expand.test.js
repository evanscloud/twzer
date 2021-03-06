const sinon  = require('sinon');
const chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;
const program = require('commander');
const expand = require('../lib/commands/expand')(program);

describe('Expand command', function () {
	let sandbox;

  program
    .description('URL expander and expander tool (Bitly set as default).')
    .usage('twzer <command> [option] <argument>');

	beforeEach(function () {
    sandbox = sinon.createSandbox();
	});

	afterEach(function () {
	  sandbox.restore();
	});

  it('should call the expand command with \'expand\'', function() {
    let commands, argv, response;

    commands = ['ex', 'expand'];
    argv = ['node', './lib/twzer', 'expand', 'example.com'];

    sandbox.stub(program, 'parse').withArgs(argv).callsFake(function validateCommand(argv) {
      if (commands.includes(argv.slice(2)[0])) {
      	return true;
      };
    });

    response = program.parse(argv);

    assert(program.parse.calledOnce);
    expect(response).to.be.true;
  });

  it('should call the expand command with alias \'ex\'', function() {
    let commands, argv, response;

    commands = ['ex', 'expand'];
    argv = ['node', './lib/twzer', 'ex', 'example.com'];

    sandbox.stub(program, 'parse').withArgs(argv).callsFake(function validateCommand(argv) {
      if (commands.includes(argv.slice(2)[0])) {
      	return true;
      };
    });

    response = program.parse(argv);

    assert(program.parse.calledOnce);
    expect(response).to.be.true;
  });

  it('should display error message for unknown command', function() {
    let argv, commands, response;

    commands = ['ex', 'expand'];
    argv = ['node', './lib/twzer', 'expanderrr', 'example.com'];

    sandbox.stub(program, 'parse').withArgs(argv).callsFake(function validateCommand(argv) {
      function validateCommand(input) {
        return commands.includes(input);
      }

      if (!validateCommand(argv.slice(2)[0])) {
      	return `error: invalid command '${argv.slice(2)[0]}'. Enter '-h' for help.`
      };
    });

    response = program.parse(argv);

    expect(response).to.equal(`error: invalid command '${argv.slice(2)[0]}'. Enter '-h' for help.`);
  });


  it('should display error message if no link is given', function() {
    let argv, response;

    argv = ['node', './lib/twzer', 'expand'];

    sandbox.stub(program, 'parse').withArgs(argv).callsFake(function missingArgument(argv) {
      if (argv.slice(3)[0] === undefined) {
      	return 'error: missing required argument `link\''
      };
    });

    response = program.parse(argv);

    expect(response).to.equal('error: missing required argument `link\'');
  });
});
