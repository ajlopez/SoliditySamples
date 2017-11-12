
var solc = require('solc');
var Web3 = require('web3');
var sasync = require('simpleasync');
var fs = require('fs');


var config = require('./config.json');

var sargs = require('simpleargs');

sargs
    .define('h', 'host', config.host, 'Host JSON RPC entry point')
    .define('f', 'from', config.from, 'From account address or number')
	.define('l', 'logging', false, 'Enable logging', { flag: true })

var options = sargs(process.argv.slice(2));
var args = options._;

var web3 = new Web3(options.host);

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


var contracts = compileContract(args[0]);
var contractnames = Object.keys(contracts);
var contractdef = contracts[contractnames[contractnames.length -1]];

var contract = new web3.eth.Contract(JSON.parse(contractdef.interface));

var accounts;

sasync()
.exec(function (next) {
	web3.eth.getAccounts(next)
})
.then(function (data, next) {
	accounts = data;
	
	var tx = contract.deploy({ data: contractdef.bytecode });

	tx.send({
		from: options.from || accounts[0],
		gas: 3000000,
		gasPrice: 0
	}, function (err, transactionHash) {
		if (err)
			return console.error(err);
		
		console.log('transaction hash');
		console.dir(transactionHash);
	})
	.on('receipt', function (receipt) {
		console.log('transaction receipt');
		console.dir(receipt);
		console.log('contract address', receipt.contractAddress);
	})
	.on('confirmation', function (confirmationNumber, receipt) {
		console.log('confirmation number', confirmationNumber);
		console.log('transaction receipt');
		console.dir(receipt);
		console.log('contract address', receipt.contractAddress);
	});

	console.log('transaction data');
	console.log(tx.encodeABI());

	
});

