var ExampleToken = artifacts.require("ExampleToken.sol");

contract('ExampleToken', function(accounts) {

  it("should return the correct totalSupply after construction", async function() {
    let token = await ExampleToken.new(accounts[0], 100);
    let totalSupply = await token.totalSupply();

	console.log('total supply', totalSupply);
    assert.equal(totalSupply, 10000);
  })

});
