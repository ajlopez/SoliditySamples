
// pragma solidity ^0.4.18;

// Simple counter contract

contract Counter {
    uint counter;
	
    function Counter() public {
        counter = 1;
    }
    
    function increment() public {
        counter++;
    }
	
    function add(uint v) public {
        counter += v;
    }
	
    function getCounter() public constant returns (uint) {
        return counter;
    }
}

