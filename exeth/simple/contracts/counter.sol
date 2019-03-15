
pragma solidity ^0.4.24;

// Simple counter contract

contract Counter {
    uint counter;
	
    // function Counter() public {
    constructor() public {
        counter = 1;
    }
    
    function increment() public {
        counter++;
    }
	
    function add(uint v) public {
        counter += v;
    }
	
    function getCounter() public view returns (uint) {
        return counter;
    }
}

