
var executor = require('./lib/executors').executor();

var path = require('path');

function normalize(filename) {
	var ext = path.extname(filename);
	
	if (!ext || ext.length == 0)
		return filename + '.eth';
	
	return filename;
}

var cmdfile = normalize(process.argv[2]);

executor.executeFile(cmdfile, function (err, data) {
	if (err)
		console.error(err);
});