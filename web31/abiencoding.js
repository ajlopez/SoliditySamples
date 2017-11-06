
var Web3 = require('web3');

var web = new Web3();

console.log(web.eth.abi.encodeParameter('int[]', [1, 2, 3]));

console.log(web.eth.abi.encodeParameter('string[]', ['hello adsad asdsa asdsa asdsa hello adsad asdsa asdsa asdsa hello adsad asdsa asdsa asdsa', 'world']));

web.eth.abi.decodeParameter('string[]', web.eth.abi.encodeParameter('string[]', ['hello', 'world']));

