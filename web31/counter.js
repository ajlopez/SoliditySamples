
var solc = require('solc');
var Web3 = require('web3');
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

var contracts = compileContract('counter.sol');
var contractnames = Object.keys(contracts);
var contractdef = contracts[contractnames[contractnames.length - 1]];
var contract = new web3.eth.Contract(JSON.parse(contractdef.interface));

var accounts;

var run = async () => {
    const accounts = await web3.eth.getAccounts();    
	
	var tx = contract.deploy({ data: contractdef.bytecode });

   	console.log('transaction data');
	console.log(tx.encodeABI());

	var transactionHash = await tx.send({
		from: options.from || accounts[0],
		gas: 3000000,
		gasPrice: 0
	}).on('receipt', async function (receipt) {
		console.log('transaction receipt');
		console.dir(receipt);
		console.log('contract address', receipt.contractAddress);
        var counter = new web3.eth.Contract(JSON.parse(contractdef.interface), receipt.contractAddress);
        console.log(Object.keys(counter.methods));
        
        const c = await counter.methods.getCounter().call();
        
        console.log('counter', c);
        
        await counter.methods.increment().send({
            from: options.from || accounts[0],
            gas: 3000000,
            gasPrice: 0
        });
        
        const c2 = await counter.methods.getCounter().call();
        
        console.log('counter', c2);
        
        await counter.methods.add(40).send({
            from: options.from || accounts[0],
            gas: 3000000,
            gasPrice: 0
        });
        
        const c3 = await counter.methods.getCounter().call();
        
        console.log('counter', c3);
	})
	.on('confirmation', function (confirmationNumber, receipt) {
		console.log('confirmation number', confirmationNumber);
		console.log('transaction receipt');
		console.dir(receipt);
		console.log('contract address', receipt.contractAddress);
	});
}

run();


