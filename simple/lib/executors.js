
var simpledsl = require('simpledsl');

function Executor () {
	var logger = console.log();
	var dsl = simpledsl.dsl();
	
	dsl.register('message', function (cmd, next) {
		try {
			logger.log.apply(null, cmd.args);
			next(null, null);
		}
		catch (ex) {
			next(ex, null);
		}
	});
	
	this.use = function (name, value) {
		if (name === 'logger')
			logger = value;
	};
	
	this.execute = function (txt, cb) {
		dsl.execute(txt, cb);
	}
}

function createExecutor() {
	return new Executor();
}

module.exports = {
	executor: createExecutor
};