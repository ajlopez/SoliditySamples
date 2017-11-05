
var executor = require('./lib/executors').executor();

var cmdfile = process.argv[2];

executor.executeFile(cmdfile, function (err, data) {
	if (err)
		console.error(err);
});