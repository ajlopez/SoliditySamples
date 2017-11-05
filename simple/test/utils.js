
var utils = require('../lib/utils');

exports['encode decode integer value'] = function (test) {
    var encoded = utils.encodeValue(42);
    var result = utils.decodeValue(encoded);
    
    test.equal(result, 42);
}

exports['encode hexa value'] = function (test) {
    var encoded = utils.encodeValue('0x1');

	test.ok(encoded);
	test.equal(encoded.length, 64);
	test.equal(encoded, '0000000000000000000000000000000000000000000000000000000000000001');
}

exports['encode hexa arguments'] = function (test) {
    var encoded = utils.encodeArguments(['0x1', '0x10']);

	test.ok(encoded);
	test.equal(encoded.length, 128);
	test.equal(encoded, '00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000010');
}

exports['encode hexa arguments'] = function (test) {
    var encoded = utils.encodeArguments(['0x1', '0x10']);

	test.ok(encoded);
	test.equal(encoded.length, 128);
	test.equal(encoded, '00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000010');
}
