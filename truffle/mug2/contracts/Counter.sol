pragma solidity ^0.4.24;

contract Counter {
    uint public counter;
    
    constructor() public {
        counter = 1;
    }
    
    function increment() public {
        counter++;
    }
    
    function add(uint val) public {
        counter += val;
    }
}

