
var executors = require('../lib/executors');

exports['compile empty contract'] = function (test) {
	var executor = executors.executor();
	
	test.async();
	
	executor.execute('compile ./contracts/empty.sol', function (err, data) {
		if (err)
			console.error(err);
		
		test.ok(!err);
		test.ok(executor.contract('./contracts/empty.sol:Empty'));
		test.ok(executor.contract('Empty'));
		test.done();
	});
}

exports['compile two contracts'] = function (test) {
	var executor = executors.executor();
	
	test.async();
	
	executor.execute('compile ./contracts/foobar.sol', function (err, data) {
		test.ok(!err);
		test.ok(executor.contract('./contracts/foobar.sol:Foo'));
		test.ok(executor.contract('Foo'));
		test.ok(executor.contract('./contracts/foobar.sol:Bar'));
		test.ok(executor.contract('Bar'));
		test.done();
	});
}
