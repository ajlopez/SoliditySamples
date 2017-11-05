
var simpledsl = require('simpledsl');

function Executor () {
	var logger = console;
	var dsl = simpledsl.dsl({ comment: '#' });
	
	register('message', function (cmd, next) {
		logger.log.apply(null, cmd.args);
		next(null, null);
	});
	
	register('assert', function (cmd, next) {
		var expr = cmd.args.join(' ');
		next(null, eval(expr));
	});
	
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
}

function createExecutor() {
	return new Executor();
}

module.exports = {
	executor: createExecutor
};