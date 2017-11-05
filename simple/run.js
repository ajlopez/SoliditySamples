
var executor = require('./lib/executors').executor();

var path = require('path');
var config = require('./config.json');

var sargs = require('simpleargs');

sargs
    .define('h', 'host', config.host, 'Host JSON RPC entry point');

var options = sargs(process.argv.slice(2));
var args = options._;

if (options.host)
	executor.host(options.host);
	
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