
var rskapi = require('rskapi');
var solc = require('solc');

var fs = require('fs');
var path = require('path');

var host = rskapi.host('http://localhost:4444');

function findImports(path) {
    console.log('Import', path);
    return { contents: fs.readFileSync('./' + path).toString() };
    // return { error: 'File not found' }
}

function compileContract(name, filename) {
    var input = fs.readFileSync(filename).toString();
    var sources = {};
    sources[filename] = input;
    var output = solc.compile({ sources: sources }, 1, findImports); // 1 activates the optimiser

	for (var n in output.contracts)
		if (n.endsWith(':' + name))
			return output.contracts[n];
}

function compile(args, cb) {
	var filename = path.join('.', 'contracts', args[0]);
	var name = args[1];
	
	try {
		var result = compileContract(name, filename);
		cb(null, result);
	}
	catch (err) {
		cb(err);
	}
}

function accounts(args, cb) {
	host.getAccounts(cb);
}

function number(args, cb) {
	host.getBlockNumber(cb);
};

function block(args, cb) {
	var id = args[0];
	
	if (typeof id === 'number' || id.length <= 10)
		host.getBlockByNumber(parseInt(id), cb);
	else
		host.getBlockByHash(id, cb);
};

module.exports = {
	compile: compile,
	
	accounts: accounts,
	number: number,
	block: block
};