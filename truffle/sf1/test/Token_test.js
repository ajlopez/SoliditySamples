
const Token = artifacts.require('./Token.sol');

contract('Token', function (accounts) {
    it('create token', async function () {
        const token = await Token.new();
        
        const balance = await token.balanceOf(accounts[0]);
        
        assert.equal(balance, 1000000);
    });

    it('create token with another account', async function () {
        const token = await Token.new({ from: accounts[1] });
        
        const balance = await token.balanceOf(accounts[1]);
        
        assert.equal(balance, 1000000);

        const balance0 = await token.balanceOf(accounts[0]);
        
        assert.equal(balance0, 0);
    });

    it('transfer', async function () {
        const token = await Token.new();
        
        await token.transfer(accounts[1], 1000, { from: accounts[0] });
        
        const balance = await token.balanceOf(accounts[1]);
        
        assert.equal(balance, 1000);

        const balance0 = await token.balanceOf(accounts[0]);
        
        assert.equal(balance0, 1000000 - 1000);
    });
});

