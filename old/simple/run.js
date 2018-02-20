
var executor = require('./lib/executors').executor();

var path = require('path');
var config = require('./config.json');

var sargs = require('simpleargs');

sargs
    .define('h', 'host', config.host, 'Host JSON RPC entry point')
    .define('f', 'from', config.from, 'From account address or number')
	.define('l', 'logging', false, 'Enable logging', { flag: true })
	
var options = sargs(process.argv.slice(2));
var args = options._;

if (options.host)
	executor.host(options.host);

if (options.from != null)
	executor.from(options.from);

if (options.logging)
	executor.logging(options.logging);
	
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