
var assert = require('assert');
var Counter = artifacts.require("./Counter.sol");

contract("Counter", function (accounts) {
	var counter;
	
	beforeEach(async function () {
		counter = await Counter.new();
	});

	describe("Increment", function () {
		it("Create counter", async function () {
			const c = await counter.counter();
			assert.equal(c, 0);
		});

		it("Increment counter", async function () {
			await counter.increment();
			const c = await counter.counter();
			assert.equal(c, 1);
		});
	});

	it("Add value to counter", async function () {
		await counter.add(1);
		await counter.add(41);
		const c = await counter.counter();
		assert.equal(c, 42);
	});
});

