
var contexts = require('../lib/contexts');

exports['unknown contract'] = function (test) {
	var context = contexts.context();
	
	test.equal(context.contract('foo'), null);
};

exports['set and get contract'] = function (test) {
	var context = contexts.context();
	var contract = { name: 'foo' };
	
	context.contract('foo', contract);
	
	test.deepEqual(context.contract('foo'), contract);
};
