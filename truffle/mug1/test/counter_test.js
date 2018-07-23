
var Counter = artifacts.require('./Counter.sol');

contract('Counter', function (accounts) {
	console.log(accounts);
	
	var contract;
	
	beforeEach(async function() {
		contract = await Counter.new();
		
		console.log('contract deployed', contract.address);		
	});
	
	it('create contract', async function () {
		assert.equal(await contract.counter(), 0);
	});
	
	it('increment counter', async function () {
		await contract.increment();
		
		assert.equal(await contract.counter(), 1);
	});
});

