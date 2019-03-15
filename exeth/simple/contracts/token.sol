// pragma solidity ^0.4.18;

contract Token { 
    mapping (address => uint) public balances;
    
	event Transfer(address sender, address receiver, uint amount);

	/* Initializes contract with initial supply tokens to the creator of the contract */
    constructor() public {
        balances[msg.sender] = 10000;
    }

	/* Very simple transfer function */
    function transfer(address receiver, uint amount) public returns(bool sufficient) {
        // require(balances[msg.sender] >= amount);
        if (balances[msg.sender] <= amount) 
			return false;
        
		balances[msg.sender] -= amount;
        balances[receiver] += amount;
        
		emit Transfer(msg.sender, receiver, amount);
        
		return true;
    }
}

