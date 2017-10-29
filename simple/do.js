
var commands = require('./lib/commands');
var config = require('./config.json');

var sargs = require('simpleargs');

sargs
    .define('h', 'host', config.host, 'Host JSON RPC entry point')
    .define('n', 'name', config.name, 'Name of the new entity')
    .define('g', 'gas', config.name, 'Gas limit to consume');

var options = sargs(process.argv.slice(3));

var args = options._ || [];
var cmdname = process.argv[2];

commands[cmdname](args, options, function (err, data) {
	if (err)
		console.error('error', err);
	else
		console.log(data);
});

