
function Context() {
	var data = {
		contracts: {}
	};
	
	this.contract = function (name, value) {
		if (value !== undefined)
			data.contracts[name] = value;
		else
			return data.contracts[name];
	};
}

function createContext() {
	return new Context();
}

module.exports = {
	context: createContext
};