
const Ballot = artifacts.require('./Ballot');

contract('Ballot', function (accounts) {
    const voters = [ accounts[0], accounts[1], accounts[2] ];
    
    beforeEach(async function() {
        this.ballot = await Ballot.new(voters);
    });
    
    it('no votes for proposal', async function () {
        const nvotes = await this.ballot.noVotes(1);
        
        assert.equal(nvotes, 0);
    });
    
    it('vote proposal', async function () {
        await this.ballot.vote(1);
        
        const nvotes = await this.ballot.noVotes(1);
        
        assert.equal(nvotes, 1);
    });
    
    it('only voter could vote proposal', async function () {
        await this.ballot.vote(1, { from: accounts[3] });
        
        const nvotes = await this.ballot.noVotes(1);
        
        assert.equal(nvotes, 0);
    });
    
    it('repeated vote proposal', async function () {
        await this.ballot.vote(1, { from: accounts[0] });
        await this.ballot.vote(1, { from: accounts[0] });
        
        const nvotes = await this.ballot.noVotes(1);
        
        assert.equal(nvotes, 1);

        const votes = await this.ballot.getVotes(1);
        
        assert.equal(votes.length, 1);
        assert.equal(votes[0], accounts[0]);
    });
    
    it('two votes for proposal', async function () {
        await this.ballot.vote(1, { from: accounts[0] });
        await this.ballot.vote(1, { from: accounts[1] });
        
        const nvotes = await this.ballot.noVotes(1);
        
        assert.equal(nvotes, 2);

        const votes = await this.ballot.getVotes(1);
        
        assert.equal(votes.length, 2);
        assert.equal(votes[0], accounts[0]);
        assert.equal(votes[1], accounts[1]);
    });
});

