
pragma solidity ^0.4.24;

contract Token {
    mapping(address => uint) balances;
    
    constructor() public {
        balances[msg.sender] = 1000000;
    }
    
    function balanceOf(address account) view public returns (uint) {
        return balances[account];
    }
    
    function transfer(address receiver, uint amount) public {
        require(balances[msg.sender] >= amount);

        /*
        if (balances[msg.sender] < amount)
            return false;
        */
        
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
    }
}


