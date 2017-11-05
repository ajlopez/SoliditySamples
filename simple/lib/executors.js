
var simpledsl = require('simpledsl');

function Executor () {
	var self = this;
	var logger = console;
	var dsl = simpledsl.dsl({ comment: '#' });
	var value;
	
	register('message', function (cmd, next) {
		logger.log.apply(null, cmd.args);
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
		var expr = args.join(' ');
		return eval(expr);
	}
}

function createExecutor() {
	return new Executor();
}

module.exports = {
	executor: createExecutor
};