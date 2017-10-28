
var commands = require('./lib/commands');

var cmdname = process.argv[2];

commands[cmdname](function (err, data) {
	if (err)
		console.log('error', err);
	else
		console.log(data);
});

