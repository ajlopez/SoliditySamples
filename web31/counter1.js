
var Web3 = require('web3');

var web = new Web3('http://localhost:8545');

var json = require('./counter.json');

var contract = new web.eth.Contract(json);

console.dir(contract.methods);
console.dir(contract.options);

console.log(contract.methods.add(1).encodeABI());

