
function repeatFunction(fn, ntimes, cb) {
	if (ntimes <= 0)
		return cb(null, null);
	
	fn(function (err, data) {
		if (err)
			return cb(err);
		
		setTimeout(function () {
			repeatFunction(fn, ntimes - 1, cb);
		}, 0);
	});
}

function fillTo64(str) {
	if (str.length % 1)
		str += '0';
	
	while (str.length % 64)
		str += '00';
	
	return str;
}

function stringToHex(str) {
	var hex = Buffer.from(str).toString('hex');
	
	if (hex.length % 1)
		hex = '0' + hex;
	
	return hex;
}

function encodeHexaValue(arg) {
	if (arg.startsWith('0x'))
		arg = arg.substring(2);
	
	while (arg.length < 64)
		arg = '0' + arg;
	
	return arg;
}

function encodeStringArgument(arg, ending) {
	var result = [];
	
	result.push(encodeIntegerArgument(ending));
	
	var encoded = encodeIntegerArgument(arg.length) + fillTo64(stringToHex(arg));
	
	result.push(encoded);
	
	return result;
}

function encodeStringValue(arg) {
	return encodeIntegerArgument(arg.length) + fillTo64(stringToHex(arg));
	
	return result;
}

function encodeValue(arg) {
    if (typeof arg === 'string')
		if (arg.startsWith('0x'))
			return encodeHexaValue(arg);
		else
			return encodeStringValue(arg);
    else
        return encodeIntegerArgument(arg);
}

function encodeArguments(args) {
	var result = '';
	var varresult = '';
	
	args.forEach(function (arg) {
		if (typeof arg === 'string') {
			if (arg.startsWith('0x'))
				result += encodeHexaValue(arg);
			else {
				var encoded = encodeStringArgument(arg, args.length * 32 + varresult.length / 2);
				result += encoded[0];
				varresult += encoded[1];
			}
		}
		else
			result += encodeIntegerArgument(arg);
	});
	
	return result + varresult;
}

function hexToString(hex) {
	var str = '';
	
	for (var k = 0; k < hex.length; k += 2)
		str += String.fromCharCode(parseInt(hex.substring(k, k + 2), 16));
	
	return str;
}

function decodeValue(encoded) {
	if (encoded.substring(0,2) === '0x')
		encoded = encoded.substring(2);
	
	if (encoded.length > 64) {
		var position = decodeValue(encoded.substring(0, 64)) * 2;
		var length = decodeValue(encoded.substring(position, position + 64)) * 2;
		
		return hexToString(encoded.substring(position + 64, position + 64 + length));
	}

	return parseInt(encoded, 16);
}

function decodeValues(encoded) {
	if (encoded.substring(0,2) === '0x')
		encoded = encoded.substring(2);
	
	var values = [];
	
	while (encoded.length >= 64) {
		values.push(decodeValue(encoded.substring(0, 64)));
		encoded = encoded.substring(64);
	}
	
	return values;
}

function encodeIntegerArgument(arg) {
	var encoded = arg.toString(16);
	
	if (arg < 0)
		while (encoded.length < 64)
			encoded = 'f' + encoded;
	else
		while (encoded.length < 64)
			encoded = '0' + encoded;
		
	return encoded;
}

module.exports = {
	repeat: repeatFunction,
	
	encodeArguments: encodeArguments,

    encodeValue: encodeValue,
    
	decodeValue: decodeValue,
	decodeValues: decodeValues
}

