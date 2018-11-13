
const Counter = artifacts.require('./Counter');

contract('Counter', function (accounts) {
    beforeEach(async function() {
        this.counter = await Counter.new(1);
    });
    
    it('my first test', async function () {
        const value = await this.counter.counter();
        assert.equal(value.toNumber(), 1);
    });

    it('one increment', async function () {
        await this.counter.increment();
        
        const value = await this.counter.counter();
        assert.equal(value.toNumber(), 2);
    });

    it('two increments', async function () {
        await this.counter.increment();
        await this.counter.increment();
        
        const value = await this.counter.counter();
        assert.equal(value.toNumber(), 3);
    });

    it('two increments and add', async function () {
        await this.counter.increment();
        await this.counter.increment();
        await this.counter.add(39);
        
        const value = await this.counter.counter();
        assert.equal(value.toNumber(), 42);
    });
});

