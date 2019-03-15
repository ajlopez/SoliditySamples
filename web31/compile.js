
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
    console.log(Object.keys(contracts[n]));
    console.log(contracts[n].functionHashes);
    console.log(contracts[n].assembly);
    console.log(contracts[n].gasEstimates);
    console.log(contracts[n].opcodes);
    console.log(contracts[n].interface);
    console.log(contracts[n].bytecode);
    console.log(contracts[n].runtimeBytecode);
}
