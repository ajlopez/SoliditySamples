
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

	it('add counter', async function () {
		await contract.increment();
		await contract.increment();
		await contract.add(40, { from: accounts[1], gasPrice: 1, gas: 3000000 });
		
		// web3.eth.getAccounts();
		
		assert.equal(await contract.counter(), 42);
	});

	it('add counter with two arguments', async function () {
		await contract.increment();
		await contract.increment();
		
		// await contract.add(20, 20, { from: accounts[1], gasPrice: 1, gas: 3000000 });
		
		// assert.equal(await contract.counter(), 42);
		
		// await contract.process("0x01020304");
	});
});

