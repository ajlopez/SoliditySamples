
pragma solidity ^0.4.24;

contract Throw {
    modifier sentValue() {
        require(msg.value > 0);
        _;
    }
    
	constructor() public payable sentValue {
		// require(msg.value > 0);
        //if (msg.value == 0)
        //    throw;
	}
    
    function otherFunction() public payable sentValue {
		// require(msg.value > 0);
    }
}

