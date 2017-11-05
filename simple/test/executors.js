
var executors = require('../lib/executors');

exports['executor as object'] = function (test) {
	var executor = executors.executor();
	
	test.ok(executor);
	test.equal(typeof executor, 'object');
};

exports['execute message'] = function (test) {
	var executor = executors.executor();
	test.async();
	
	executor.use('logger', {
		log: function () {
			test.ok(arguments);
			test.equal(arguments[0], "hello");
			test.equal(arguments[1], "world");
		}
	}); 
	
	executor.execute('message hello world', function (err, data) {
		test.ok(!err);
		test.ok(!data);
		test.done();
	});
};

exports['execute file with message'] = function (test) {
	var executor = executors.executor();
	test.async();
	
	executor.use('logger', {
		log: function () {
			test.ok(arguments);
			test.equal(arguments[0], "hello");
			test.equal(arguments[1], "world");
		}
	}); 
	
	executor.executeFile('./message.txt', function (err, data) {
		test.ok(!err);
		test.ok(!data);
		test.done();
	});
};

