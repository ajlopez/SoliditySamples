
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

exports['execute dump'] = function (test) {
	var executor = executors.executor();
	test.async();
	
	executor.use('logger', {
		dir: function () {
			test.ok(arguments);
			test.deepEqual(arguments[0], { name: 'Adam', age: 800 });
		}
	}); 
	
	executor.execute(['evaluate new Object({ name: "Adam", age: 800 })', 'dump value'], function (err, data) {
		if (err)
			console.error(err);
		
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

