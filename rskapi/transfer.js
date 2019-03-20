
const rskapi = require('rskapi');
var Tx = require('ethereumjs-tx');

const config = require('./config.json');

const value = parseInt(process.argv[2]);
let targetAccount = process.argv[3];

const host = rskapi.host(config.host);

const privateKey = new Buffer(config.account.privateKey.substring(2), 'hex');

const tx = {
    to: targetAccount,
    value: value,
    gas: 22000,
    gasPrice: 0
};

(async function () {
    const nonce = await host.getTransactionCount(config.account.address);
    
    tx.nonce = nonce;
    
    var xtx = new Tx(tx);
    xtx.sign(privateKey);
    var serializedTx = xtx.serialize();
    
    host.sendRawTransaction('0x' + serializedTx.toString('hex'));
})();

