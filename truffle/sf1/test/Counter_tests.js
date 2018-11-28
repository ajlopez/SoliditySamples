
const Counter = artifacts.require('./Counter.sol');

contract('Counter', function (accounts) {
    // console.dir(accounts);
    
    describe('first tests', function () {
        beforeEach(async function () {
            this.counter = await Counter.new();
        });
        
        it('create contract', async function () {
            assert.equal(await this.counter.counter(), 1);
        });

        it('increment', async function () {
            await this.counter.increment();
            
            assert.equal(await this.counter.counter(), 2);
        });

        it('increment and add', async function () {
            await this.counter.increment();
            await this.counter.add(40);
            
            assert.equal(await this.counter.counter(), 42);
        });
    });
});


