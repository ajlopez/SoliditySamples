
const Bytes = artifacts.require('./Bytes.sol');

contract('Bytes', function (accounts) {
    /*
    it('set data and get item', async function () {
        const bytes = await Bytes.new();
        
        await bytes.setData([ '0x01', '0x0102', '0x01022a' ]);
    });

    it('set data2 and get item', async function () {
        const bytes = await Bytes.new();
        
        await bytes.setData2([ 'adam', 'eve' ]);
    });
    */
    
    it('transaction', async function () {
        const bytes = await Bytes.new();
        
        const txdata = {
            from: accounts[0],
            to: bytes.address,
            gas: "0x6691b7",
            gasPrice: "0x100",
            data: "0x9d5ef15e00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000001010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020102000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000301022a0000000000000000000000000000000000000000000000000000000000"
        };
        
        await web3.eth.sendTransaction(txdata);
        
        const item0 = await bytes.getDataItem(0);
        assert.equal(item0, '0x01');
        
        const item1 = await bytes.getDataItem(1);
        assert.equal(item1, '0x0102');
        
        const item2 = await bytes.getDataItem(2);
        assert.equal(item2, '0x01022a');
    });
});
