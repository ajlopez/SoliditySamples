
var rskapi = require('rskapi');

var host = rskapi.host('http://localhost:4444');

function accounts(cb) {
	host.getAccounts(cb);
}

module.exports = {
	accounts: accounts
};