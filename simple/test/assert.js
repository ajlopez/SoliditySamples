
var executors = require('../lib/executors');

exports['assert true'] = function (test) {
	var executor = executors.executor();
	
	test.async();
	
	executor.execute('assert true', function (err, data) {
		test.ok(!err);
		test.equal(data, true);
		test.done();
	});
}

exports['assert false'] = function (test) {
	var executor = executors.executor();
	
	test.async();
	
	executor.execute('assert false', function (err, data) {
		test.ok(err);
		test.equal(err.toString(), 'Error: failed assertion: false');
		test.ok(!data);
		test.done();
	});
}
