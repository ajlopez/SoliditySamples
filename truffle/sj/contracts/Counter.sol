
pragma solidity ^0.4.24;

contract Counter {
    uint public counter;
    
    constructor(uint value) public {
        counter = value;
    }
    
    function increment() public {
        counter++;
    }
    
    function add(uint v) public {
        counter += v;
    }
}
