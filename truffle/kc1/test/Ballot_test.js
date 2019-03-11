
const Ballot = artifacts.require('Ballot');

contract('Ballot', function (accounts) {
    beforeEach(async function () {
        this.ballot = await Ballot.new();
    });
    
    it('no vote for new proposal', async function () {
       const novotes = await this.ballot.noVotes(1);
       
       assert.equal(novotes, 0);
    });
    
    it('vote proposal', async function () {
       await this.ballot.vote(1);
       
       const novotes = await this.ballot.noVotes(1);
       
       assert.equal(novotes, 1);
    });
    
    it('vote proposal twice', async function () {
       await this.ballot.vote(1);
       await this.ballot.vote(1);
       
       const novotes = await this.ballot.noVotes(1);
       
       assert.equal(novotes, 2);
    });
});

