
const Ballot = artifacts.require('./Ballot.sol');

async function expectThrow (promise) {
  try {
    await promise;
  } catch (error) {
      return;
  }
  
  assert.fail('Expected throw not received');
}

contract('Ballot', function (accounts) {
    beforeEach(async function () {
        this.ballot = await Ballot.new([ accounts[0], accounts[1] ]);
    });
    
    it('no votes in unknown proposal', async function () {
        // bytes32 identificar propuesta por hash
        
        const novotes = await this.ballot.noVotes(1);
        
        assert.equal(novotes, 0);
    });
    
    it('vote proposal', async function () {
        await this.ballot.vote(1);
        
        const novotes = await this.ballot.noVotes(1);
        
        assert.equal(novotes, 1);
    });
    
    it('vote proposal and get voter', async function () {
        await this.ballot.vote(1);
        
        const voters = await this.ballot.getVoters(1);
        
        assert.ok(voters);
        assert.equal(voters.length, 1);
        assert.equal(voters[0], accounts[0]);
    });
    
    it('vote proposal twice and get voters', async function () {
        await this.ballot.vote(1);
        await this.ballot.vote(1, { from: accounts[1] });
        
        const voters = await this.ballot.getVoters(1);
        
        assert.ok(voters);
        assert.equal(voters.length, 2);
        assert.equal(voters[0], accounts[0]);
        assert.equal(voters[1], accounts[1]);
    });

    it('avoid double vote', async function () {
        await this.ballot.vote(1);
        expectThrow(this.ballot.vote(1));
        
        const voters = await this.ballot.getVoters(1);
        
        assert.ok(voters);
        assert.equal(voters.length, 1);
        assert.equal(voters[0], accounts[0]);
    });

    it('only voter can vote', async function () {
        expectThrow(this.ballot.vote(1, { from: accounts[2] }));
        
        const novotes = await this.ballot.noVotes(1);
        
        assert.equal(novotes, 0);
    });
});

