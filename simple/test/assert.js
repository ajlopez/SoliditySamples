
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