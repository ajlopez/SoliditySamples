
const Token = artifacts.require('./Token.sol');

async function expectThrow (promise) {
  try {
    await promise;
  } catch (error) {
      return;
  }
  
  assert.fail('Expected throw not received');
}

contract('Token', function (accounts) {
    it('create token with initial balance', async function () {
        var token = await Token.new(10000);
        
        const balance = await token.balanceOf(accounts[0]);
        
        assert.equal(balance, 10000);
    });
    
    it('transfer tokens', async function ()  {
        var token = await Token.new(10000);
        
        await token.transfer(accounts[1], 1000);
        
        const balance = await token.balanceOf(accounts[0]);
        assert.equal(balance, 9000);
        const balance2 = await token.balanceOf(accounts[1]);
        assert.equal(balance2, 1000);
    });
    
    it('cannot transfer tokens if not enough balance', async function ()  {
        var token = await Token.new(10000);
        
        expectThrow(token.transfer(accounts[1], 1000, { from: accounts[2] }));
        
        const balance = await token.balanceOf(accounts[0]);
        assert.equal(balance, 10000);
        const balance2 = await token.balanceOf(accounts[1]);
        assert.equal(balance2, 0);
        const balance3 = await token.balanceOf(accounts[2]);
        assert.equal(balance3, 0);
    });

    it('owner emits new tokens', async function ()  {
        var token = await Token.new(10000);
        
        await token.emit(1000);
        
        const balance = await token.balanceOf(accounts[0]);
        assert.equal(balance, 11000);
    });

    it('not owner cannot emit new tokens', async function ()  {
        var token = await Token.new(10000);

        expectThrow(token.emit(1000, { from: accounts[1] }));
        
        const balance = await token.balanceOf(accounts[0]);
        assert.equal(balance, 10000);
        const balance2 = await token.balanceOf(accounts[1]);
        assert.equal(balance2, 0);
    });
});

