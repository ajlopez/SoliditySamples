
const Counter = artifacts.require("Counter");

contract('Counter', function (accounts) {
    //console.log(accounts);
    
    beforeEach(async function () {
        this.counter = await Counter.new();
    });
    
    it('counter is one', async function () {
        //console.log(counter.address);
        const c = await this.counter.counter();
        //console.log(c.toNumber());
        assert.equal(c, 1);
    });
    
    it('increment', async function () {
        await this.counter.increment();
        const c = await this.counter.counter();
        assert.equal(c, 2);
    });
    
    it('add', async function () {
        await this.counter.increment();
        await this.counter.add(40);
        const c = await this.counter.counter();
        assert.equal(c, 42);
    });
});

