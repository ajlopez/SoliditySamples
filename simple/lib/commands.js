
var rskapi = require('rskapi');
var solc = require('solc');

var fs = require('fs');
var path = require('path');

var host = rskapi.host('http://localhost:4444');

var ctxfilename = 'context.json';
var context = loadContext(ctxfilename);

function setHost(url) {
	if (!url) {
		if (!host)
			host = rskapi.host('http://localhost:4444');
	}
	else
		host = rskapi.host(url);
}

function loadContext(filename) {
	if (!fs.existsSync(filename))
		return {};
	
	return JSON.parse(fs.readFileSync(filename).toString());
}

function saveContext(filename, ctx) {
	var text = JSON.stringify(ctx);
	
	fs.writeFileSync(filename, text);
}

function saveContract(name, value) {
	if (!context.contracts)
		context.contracts = {};
	
	context.contracts[name] = value;
}

function findImports(path) {
    console.log('Import', path);
    return { contents: fs.readFileSync('./' + path).toString() };
    // return { error: 'File not found' }
}

function compileContract(filename, name) {
    var input = fs.readFileSync(filename).toString();
    var sources = {};
    sources[filename] = input;
    var output = solc.compile({ sources: sources }, 1, findImports); // 1 activates the optimiser

	if (!name) {
		var fullname = Object.keys(output.contracts)[0];
		var p = fullname.lastIndexOf(':');
		
		if (p >= 0)
			name = fullname.substring(p + 1);
		else
			name = fullname;
	}
	
	for (var n in output.contracts)
		if (n.endsWith(':' + name)) {
			var contract = output.contracts[n];
			
			saveContract(name, contract);
			saveContext(ctxfilename, context);
			
			return { name: name, contract: contract };
			
		}
}

function compile(args, options, cb) {
	var filename = path.join('.', 'contracts', args[0]);
	var name = args[1];
	
	setHost(options.host);
	
	try {
		var result = compileContract(filename, name);
		cb(null, result.name);
	}
	catch (err) {
		cb(err);
	}
}

function accounts(args, options, cb) {
	setHost(options.host);
	host.getAccounts(cb);
}

function number(args, options, cb) {
	setHost(options.host);
	host.getBlockNumber(cb);
};

function block(args, options, cb) {
	setHost(options.host);
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

