
const Counter = artifacts.require('./Counter.sol');

contract('Counter', function (accounts) {
//    console.dir(accounts);
    var counter;
    
    beforeEach(async function() {
        counter = await Counter.new();
    });

    describe('first tests', function () {
        it('initial counter', async function () {
            const c1 = await counter.counter();
            
            assert.equal(c1, 1);
        });

        it('increment', async function () {
            await counter.increment();
            
            const c1 = await counter.counter();
            
            assert.equal(c1, 2);
        });

        it('add', async function () {
            await counter.increment();
            await counter.add(40);
            
            const c1 = await counter.counter();
            
            assert.equal(c1, 42);
        });
    });
});

