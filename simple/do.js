
var commands = require('./lib/commands');

var args = process.argv.slice(3);
var cmdname = process.argv[2];

commands[cmdname](args, function (err, data) {
	if (err)
		console.log('error', err);
	else
		console.log(data);
});

