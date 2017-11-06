
var fs = require('fs');

var rskapi = require('rskapi');
var simpledsl = require('simpledsl');
var solc = require('solc');
var chalk = require('chalk');

var utils = require('./utils');

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
	var from;
	
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
		var result = compileContract(expand(cmd.args)[0]);
		
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
			
			getTransactionReceipt(txhash, 60, function (err, txreceipt) {
				if (err)
					return next(err, null);
			
				log('transaction receipt', txreceipt);
				
				value = txhash;
				
				next(null, txhash);
			})
		});
	});
	
	register('from', function (cmd, next) {
		from = expand(cmd.args)[0];
		next(null, null);
	});

	register('deploy', function (cmd, next) {
		var host = self.host();
		var args = cmd.args;
		
		var contractname = args[0];
		var instancename = args[1] || contractname;
		var contract = contracts[contractname];
		
		var from = self.from();
		var to = '0x00';
		var bytecode = contract.bytecode;
		
		var tx;
		
		var txdata = {
			from: from,
			// to: to,
			value: 0,
			data: bytecode,
			gas: 2000000,
			gasPrice: 0
		};

		log('transaction data', txdata);

		host.sendTransaction(txdata, function (err, txhash) {
			if (err)
				return next(err, null);
			
			log('transaction hash', txhash);
			
			getTransactionReceipt(txhash, 60, function (err, txreceipt) {
				if (err)
					return next(err, null);
			
				log('transaction receipt', txreceipt);
				
				instances[instancename] = {
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
		var args = cmd.args;
		
		var instancename = args[0];
		var fnname = args[1];
		
		var fnargs = expand(args.slice(2));
		
		var from = self.from();
		var to = instances[instancename].contractAddress;
		var data = toData(instancename, fnname, fnargs);
		
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
			
			result = utils.decodeValue(result);
			
			value = result;
			
			next(null, result);
		});
	});
	
	register('invoke', function (cmd, next) {
		var host = self.host();
		var args = cmd.args;
		
		var instancename = args[0];
		var fnname = args[1];
		
		var fnargs = expand(args.slice(2));
		
		var from = self.from();
		var to = instances[instancename].contractAddress;
		var data = toData(instancename, fnname, fnargs);
		
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
			
			getTransactionReceipt(txhash, 60, function (err, txreceipt) {
				if (err)
					return next(err, null);
			
				log('transaction receipt', txreceipt);
				
				value = txhash;
				
				next(null, txhash);
			})
		});
	});
	
	this.from = function (value) {
		if (value != null)
			return from = value;
		
		if (from && accounts && accounts[from])
			return accounts[from];
		
		if (from)
			return from;
		
		if (accounts)
			return accounts[0];
		
		throw new Error('unknown sender');
	}
	
	this.logging = function (value) {
		logging = value;
	}
	
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
	
	this.host = function (value) {
		if (value)
			host = rskapi.host(value);
		
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
	
	function toData(instancename, fnname, fnargs) {
		var contract = contracts[instances[instancename].contractName];
		
		return toFunctionHash(contract, fnname) + utils.encodeArguments(fnargs);
	}
	
	function toFunctionHash(contract, fnname) {
		if (contract.functionHashes[fnname])
			return contract.functionHashes[fnname];
		
		for (var n in contract.functionHashes)
			if (n.startsWith(fnname + '('))
				return contract.functionHashes[n];
	}

	function getTransactionReceipt(hash, ntry, cb) {
		var host = self.host();
		
		if (ntry <= 0)
			return cb(new Error('transaction ' + hash + ' not mined'));
		
		host.getTransactionReceiptByHash(hash, function (err, data) {
			if (err)
				return cb(err, null);
				
			if (data)
				return cb(null, data);
				
			setTimeout(function () {
				getTransactionReceipt(hash, ntry - 1, cb);
			}, 1000);
		});
	}
	
}

function createExecutor() {
	return new Executor();
}

module.exports = {
	executor: createExecutor
};

