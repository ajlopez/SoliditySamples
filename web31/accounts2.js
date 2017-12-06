
var Web3 = require('web3');

var web = new Web3('http://localhost:8545');

async function run() {
    var accounts = await web.eth.getAccounts();
    console.log(accounts);
}

run();
