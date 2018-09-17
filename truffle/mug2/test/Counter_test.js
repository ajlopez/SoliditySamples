
const Counter = artifacts.require('./Counter.sol');

contract('Counter', function (accounts) {
    console.dir(accounts);
    
    it('first test', async function () {
        const counter = await Counter.new();
        
        const c1 = await counter.counter();
        
        console.log('c1', c1.toNumber());
    });
});

