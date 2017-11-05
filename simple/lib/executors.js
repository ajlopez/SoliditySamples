
var simpledsl = require('simpledsl');

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

function Executor () {
	var self = this;
	var logger = console;
	var dsl = simpledsl.dsl({ comment: '#' });

	var value;
	var contracts = {};
	
	register('message', function (cmd, next) {
		logger.log.apply(logger, cmd.args);
		next(null, null);
	});
	
	register('dump', function (cmd, next) {
		logger.log(evaluate(cmd.args[0]));
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
}

function createExecutor() {
	return new Executor();
}

module.exports = {
	executor: createExecutor
};

