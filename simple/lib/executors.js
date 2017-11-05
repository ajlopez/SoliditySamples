
var fs = require('fs');

var rskapi = require('rskapi');
var simpledsl = require('simpledsl');
var solc = require('solc');
var chalk = require('chalk');

var DEFAULT_HOST = "http://localhost:8545";

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

function toNumber(value) {
	if (typeof value === 'string' && value.startsWith('0x'))
		return value;
	
	return parseInt(value);
}

function Executor () {
	var self = this;
	var logger = console;
	var dsl = simpledsl.dsl({ comment: '#' });

	var value;
	var host;
	var contracts = {};
	var instances = {};
	var accounts = [];
	var logging = false;
	
	register('logging', function (cmd, next) {
		logging = evaluate(cmd.args);
		next(null, null);
	});
	
	register('message', function (cmd, next) {
		logger.log.apply(logger, expand(cmd.args));
		next(null, null);
	});
	
	register('dump', function (cmd, next) {
		logger.log(evaluate(cmd.args));
		next(null, null);
	});
	
	register('evaluate', function (cmd, next) {
		var result = evaluate(cmd.args);
		self.value(result);
		next(null, result);
	});
	
	register('assert', function (cmd, next) {
		var result = evaluate(cmd.args);
		
		if (!result)
			throw new Error('failed assertion: ' + cmd.args.join(' '));
		else
			next(null, result);
	});
	
	register('compile', function (cmd, next) {
		var result = compileContract(cmd.args[0]);
		
		for (var n in result) {
			self.contract(n, result[n]);
			
			var p = n.lastIndexOf(':');
			
			if (p >= 0)
				self.contract(n.substring(p + 1), result[n]);
		}
		
		next(null, null);
	});
	
	register('accounts', function (cmd, next) {
		self.host().getAccounts(function (err, data) {
			if (err)
				next(err, null);
			else {
				accounts = data;
				log('accounts', data);
				next(null, data);
			}
		});
	});
	
	register('balance', function (cmd, next) {
		self.host().getBalance(expand(cmd.args)[0], function (err, data) {
			if (err)
				next(err, null);
			else {
				value = data;
				next(null, data);
			}
		});
	});
	
	register('host', function (cmd, next) {
		host = rskapi.host(expand(cmd.args)[0]);
		next(null, null);
	});
	
	register('transfer', function (cmd, next) {
		var host = self.host();
		var args = expand(cmd.args);
		
		var from = args[0];
		var to = args[1];
		var value = args[2];
		
		var tx;
		
		var txdata = {
			from: from,
			to: to,
			value: toNumber(value),
			gas: 4000000,
			gasPrice: 0
		};
		
		log('transaction data', txdata);

		host.sendTransaction(txdata, function (err, txhash) {
			if (err)
				return next(err, null);
			
			log('transaction hash', txhash);
			
			host.getTransactionReceiptByHash(txhash, function (err, txreceipt) {
				if (err)
					return next(err, null);
			
				log('transaction receipt', txreceipt);
				
				value = txhash;
				
				next(null, txhash);
			})
		});
	});

	register('deploy', function (cmd, next) {
		var host = self.host();
		var args = expand(cmd.args);
		
		var from = accounts[0];
		var to = '0x0';
		var bytecode = contracts[args[0]].bytecode;
		
		var tx;
		
		var txdata = {
			from: from,
			to: to,
			value: 0,
			data: bytecode,
			gas: 4000000,
			gasPrice: 0
		};

		log('transaction data', txdata);

		host.sendTransaction(txdata, function (err, txhash) {
			if (err)
				return next(err, null);
			
			log('transaction hash', txhash);
			
			host.getTransactionReceiptByHash(txhash, function (err, txreceipt) {
				if (err)
					return next(err, null);
			
				log('transaction receipt', txreceipt);
				
				instances[args[1] || args[0]] = {
					transactionHash: txhash,
					contractAddress: txreceipt.contractAddress,
					blockHash: txreceipt.blockHash,
					blockNumber: parseInt(txreceipt.blockNumber),
					contractName: args[0]
				};
				
				value = txreceipt.contractAddress;
				
				next(null, txreceipt.contractAddress);
			})
		});
	});
	
	register('call', function (cmd, next) {
		var host = self.host();
		var args = expand(cmd.args);
		
		var from = accounts[0];
		var to = instances[args[0]].contractAddress;
		var data = contracts[instances[args[0]].contractName].functionHashes[args[1] + '()'];
		
		var tx;
		
		var txdata = {
			from: from,
			to: to,
			value: 0,
			data: data,
			gas: 4000000,
			gasPrice: 0
		};

		log('transaction data', txdata);

		host.callTransaction(txdata, function (err, result) {
			if (err)
				return next(err, null);
			
			log('call result', result);
			
			value = result;
			
			next(null, result);
		});
	});
	
	register('invoke', function (cmd, next) {
		var host = self.host();
		var args = expand(cmd.args);
		
		var from = accounts[0];
		var to = instances[args[0]].contractAddress;
		var data = contracts[instances[args[0]].contractName].functionHashes[args[1] + '()'];
		
		var tx;
		
		var txdata = {
			from: from,
			to: to,
			value: 0,
			data: data,
			gas: 4000000,
			gasPrice: 0
		};

		log('transaction data', txdata);

		host.sendTransaction(txdata, function (err, txhash) {
			if (err)
				return next(err, null);
			
			log('transaction hash', txhash);
			
			host.getTransactionReceiptByHash(txhash, function (err, txreceipt) {
				if (err)
					return next(err, null);
			
				log('transaction receipt', txreceipt);
				
				value = txhash;
				
				next(null, txhash);
			})
		});
	});

	this.contract = function (name, value) {
		if (value === undefined)
			return contracts[name];
		else
			contracts[name] = value;
	}
	
	this.value = function (newvalue) {
		if (newvalue === undefined)
			return value;
		else
			value = newvalue;
	}
	
	this.use = function (name, value) {
		if (name === 'logger')
			logger = value;
	};
	
	this.execute = function (txt, cb) {
		dsl.execute(txt, cb);
	};
	
	this.executeFile = function (filename, cb) {
		dsl.executeFile(filename, cb);
	};
	
	this.evaluate = function (expr) {
		return evaluate(expr);
	}
	
	this.host = function () {
		if (host)
			return host;
		
		host = rskapi.host(DEFAULT_HOST);
		
		return host;
	}
	
	function register(name, fn) {
		dsl.register(name, function (cmd, next) {
			try {
				fn(cmd, next);
			}
			catch (ex) {
				next(ex, null);
			}
		});
	}
	
	function evaluate(args) {
		var expr;
		
		if (Array.isArray(args))
			expr = args.join(' ');
		else
			expr = args;
		
		return eval(expr);
	}
	
	function expand(args) {
		if (Array.isArray(args))
			return normalize(args).map(arg => expand(arg));
		
		return evaluate(args);
	}
	
	function normalize(items) {
		var result = [];
		var ni = items.length;
		var instring = false;
		
		for (var k = 0; k < ni; k++) {
			var item = items[k];
			
			if (instring)
				result[result.length - 1] += ' ' + item;
			else
				result.push(item);
			
			if (item.startsWith('"'))
				instring = true;
			
			if (item.endsWith('"'))
				instring = false;
		}
		
		return result;
	}
	
	function log(message, value) {
		if (!logging)
			return;
		
		if (value === undefined)
			return console.log(chalk.green(message));
		
		if (typeof value !== 'object')
			return console.log(chalk.green(message), chalk.green(value));
		
		process.stdout.write(chalk.rgb(0, 128, 0)._styles[0].open);
		console.log(message);
		console.dir(value);
		process.stdout.write(chalk.rgb(0, 128, 0)._styles[0].close);
	}
}

function createExecutor() {
	return new Executor();
}

module.exports = {
	executor: createExecutor
};

