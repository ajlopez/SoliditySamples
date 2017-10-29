
var rskapi = require('rskapi');
var async = require('simpleasync');
var solc = require('solc');

var fs = require('fs');
var path = require('path');

var host = rskapi.host('http://localhost:4444');

var ctxfilename = 'context.json';
var context = loadContext(ctxfilename);

function switchToHost(h) {
	host = h;
	flushHostContext(ctxfilename, context);
}

function setHost(url) {
	if (!url) {
		if (!host)
			switchToHost(rskapi.host('http://localhost:4444'));
	}
	else
		switchToHost(rskapi.host(url));
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

function flushHostContext(filename, ctx) {
	if (!ctx.addresses)
		return;
	
	delete ctx.addresses;
	
	saveContext(filename, ctx);
}

function toNumber(obj) {
	if (obj == null)
		return null;
	
	if (typeof obj === 'number')
		return obj;
	
	if (typeof obj === 'string' && obj.length < 16)
		return parseInt(obj);
	
	return obj;
}

function asNumber(obj) {
	if (typeof obj === 'number')
		return obj;
	
	if (typeof obj === 'string' && obj.length <= 10)
		return parseInt(obj);
	
	return null;
}

function getAccountAddress(acc, cb) {
	if (acc == null)
		return cb(null, null);
	
	host.getAccounts(function (err, accounts) {
		if (err)
			return cb(err);
		
		cb(null, getAccount(accounts));
	});

	function getAccount(accounts) {
		var n = asNumber(acc);
		
		if (n == null)
			return acc;
		
		return accounts[n];
	}	
}

function saveContract(name, value) {
	if (!context.contracts)
		context.contracts = {};
	
	context.contracts[name] = value;
}

function saveInstance(name, contractname, txhash, address) {
	if (!context.instances)
		context.instances = {};
	
	context.instances[name] = {
		contract: contractname,
		tx: txhash,
		address: address
	}
}

function getInstance(instancename) {
	if (!instancename)
		return null;
	
	if (!context.instances)
		return null;
	
	if (!context.instances[instancename])
		return null;

	return context.instances[instancename];
}

function getContract(contractname) {
	if (!contractname)
		return null;
	
	if (!context.contracts)
		return null;
	
	if (!context.contracts[contractname])
		return null;
	
	return context.contracts[contractname];
}

function getInstanceContract(instancename) {
	var instance = getInstance(instancename);
	
	if (!instance)
		return null;
	
	var contract = getContract(instance.contract);
	
	if (!contract)
		return null;
	
	return contract;
}

function getInstanceAddress(instancename) {
	var instance = getInstance(instancename);
	
	if (!instance)
		return null;
	
	if (!instance.address)
		return null;
	
	return instance.address;
}

function getInstance(name) {
	if (!context.instances)
		return null;
	
	return context.instances[name];
}

function toData(contract, fnname, fnargs) {
	return contract.functionHashes[fnname];
}

function unlockAccount(addr, cb) {
	host.unlockPersonalAccount(addr, 'passphrase', 1000, cb);
}

function sendTransaction(from, to, value, options, cb) {
    options = options || {};
	var fromaddr;
	var toaddr;
	
	async()
	.exec(function (next) {
		getAccountAddress(from, next);
	})
	.then(function (addr, next) {
		fromaddr = addr;
		getAccountAddress(to, next);
	})
	.then(function (addr, next) {
		toaddr = addr;
		unlockAccount(fromaddr, function (err, data) {
			next();
		});
	})
	.then(function (data, next) {
		var txdata = {
			from: fromaddr,
			to: toaddr,
			value: value,
			gas: options.gas || 21000,
			gasPrice: options.gasPrice || 1
		};
		
		if (options.data)
			txdata.data = options.data;

		host.sendTransaction(txdata, cb);
	})
	.error(function (err) {
		cb(err);
	});
}

function sendRawCall(from, to, value, data, options, cb) {
    options = options || {};
    
    var txdata = {
        from: from,
		to: to,
        value: value,
        gas: options.gas || 21000,
        gasPrice: options.gasPrice || 1,
		data: data
    };

    host.callTransaction(txdata, cb);
}

function sendCallOrInvoke(instancename, from, fnname, fnargs, value, options, cb, iscall) {
	var toaddr = getInstanceAddress(instancename);
	
	if (!toaddr)
		return cb(new Error('unknown instance: ' + instancename));
	
	var data = toData(getInstanceContract(instancename), fnname, fnargs);
	var tx;
	
	if (!data)
		if (fnname && fnname.startsWith('0x') && fnname.length === 10)
			data = fnname;
		else
			return cb(new Error('unknown function: ' + fnname));
	
	async()
	.exec(function (next) {
		getAccountAddress(from, next);
	})
	.then(function (addr, next) {
		if (iscall)
			return sendRawCall(addr, toaddr, value, data, options, cb);
		
		options.data = data;
		
		if (!options.gas)
			options.gas = 3000000;
		
		if (iscall)
			return sendRawCall(addr, toaddr, value, data, options, cb);
		
		sendTransaction(addr, toaddr, value, options, next);
	})
	.then(function (txhash, next) {
		tx = txhash;
		getTransactionReceipt(txhash, 60, next);
	})
	.then(function (txr, next) {
		cb(null, tx);
	})
	.error(cb);
}

function sendCall(instancename, from, fnname, fnargs, value, options, cb) {
	sendCallOrInvoke(instancename, from, fnname, fnargs, value, options, cb, true)
}

function sendInvoke(instancename, from, fnname, fnargs, value, options, cb) {
	sendCallOrInvoke(instancename, from, fnname, fnargs, value, options, cb, false)
}

function getTransactionReceipt(hash, ntry, cb) {
	if (ntry <= 0)
		return cb('transaction ' + hash + 'not mined');
	
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

function createContract(contractname, owner, value, options, cb) {
	var opts = {};
	
	opts.gas = options.gas || 3000000;
	opts.data = context.contracts[contractname].bytecode;
	
	var name = options.name || contractname;
	var txhash;
	
	async()
	.exec(function (next) {
		sendTransaction(owner, null, value, opts, next);
	})
	.then(function (tx, next) {
		txhash = tx;
		getTransactionReceipt(txhash, 60, next);
	})
	.then(function (txr, next) {
		saveInstance(name, contractname, txhash, txr.contractAddress);
		saveContext(ctxfilename, context);
		
		cb(null, name);		
	})
	.error(function (err) {
		cb(err);
	});
}

function findImports(path) {
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

function account(args, options, cb) {
	setHost(options.host);
	getAccountAddress(args[0], cb);
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

function blocks(args, options, cb) {
	setHost(options.host);
	var id = args[0];
	
	host.getBlocksByNumber(parseInt(id), cb);
};

function balance(args, options, cb) {
	setHost(options.host);
	
	var address = args[0];
	
	async()
	.exec(function (next) {
		getAccountAddress(address, next);
	})
	.then(function (addr, next) {
		host.getBalance(addr, next);
	})
	.then(function (balance, next) {
		cb(null, toNumber(balance));
	})
	.error(function (err) {
		cb(err);
	});
}

function balances(args, options, cb) {
	setHost(options.host);
	
	async()
	.exec(function (next) {
		host.getAccounts(next);
	}).map(function (data, next) {
		host.getBalance(data, function (err, balance) {
			cb(err, { account: data, balance: balance });
		});
	}).then(function (data, next) {
		cb(null, data);
	}).error(function (err) {
		cb(err);
	});
}

function deploy(args, options, cb) {
	setHost(options.host);
	
	createContract(args[0], args[1], args[2], options, cb);
}

function fns(args, options, cb) {
	var name = args[0];
	
	if (!context.contracts[name])
		return cb('unknown contract: ' + name);
	
	cb(null, Object.keys(context.contracts[name].functionHashes));
}

function transfer(args, options, cb) {
	setHost(options.host);
	
	var from = args[0];
	var to = args[1];
	var value = args[2];
	var tx;
	
	async()
	.exec(function (next) {
		sendTransaction(from, to, value, options, next);
	})
	.then(function (txhash, next) {
		tx = txhash;
		getTransactionReceipt(txhash, 60, next);
	})
	.then(function (txr, next) {
		cb(null, tx);
	})
	.error(function (err) {
		cb(err);
	});
}

function instance(args, options, cb) {
	var name = args[0];
	cb(null, getInstance(name));
}

function call(args, options, cb) {
	setHost(options.host);
	
	var name = args[0];
	var from = args[1];
	var fnname = args[2];
	var fnargs = args[3] ? args[3].split(';') : [];
	var value = args[4] ? toNumber(args[4]) : 0;
	
	sendCall(name, from, fnname, fnargs, value, options, cb);
}

function invoke(args, options, cb) {
	setHost(options.host);
	
	var name = args[0];
	var from = args[1];
	var fnname = args[2];
	var fnargs = args[3] ? args[3].split(';') : [];
	var value = args[4] ? toNumber(args[4]) : 0;
	
	sendInvoke(name, from, fnname, fnargs, value, options, cb);
}

module.exports = {
	compile: compile,
	deploy: deploy,
	instance: instance,
	fns: fns,
	call: call,
	invoke: invoke,

	transfer: transfer,
	
	account: account,
	accounts: accounts,
	balance: balance,
	balances: balances,
	
	number: number,
	block: block,
	blocks: blocks
};

