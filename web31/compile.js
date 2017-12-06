
var fs = require('fs');
var solc = require('solc');

function findImports(path) {
    return { contents: fs.readFileSync('./' + path).toString() };
    // return { error: 'File not found' }
}

function compileContract(filename) {
    var input = fs.readFileSync(filename).toString();
    var sources = {};
    sources[filename] = input;
	
    var output = solc.compile({ sources: sources }, 1, findImports); // 1 activates the optimiser

	return output.contracts;
}

var contracts = compileContract(process.argv[2]);

console.dir(Object.keys(contracts));

for (var n in contracts) {
    console.log(contracts[n].interface);
}
