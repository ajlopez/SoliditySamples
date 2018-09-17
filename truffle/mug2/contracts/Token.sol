pragma solidity ^0.4.24;

contract Token {
    mapping (address => uint) balances;
    
    address owner;
    
    constructor(uint initial) public {
        balances[msg.sender] = initial;
        owner = msg.sender;
    }
    
    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }
    
    function transfer(address receiver, uint amount) public {
        require(balances[msg.sender] >= amount);
        
        balances[msg.sender] -= amount; 
        balances[receiver] += amount;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    function emit(uint amount) onlyOwner public {
        balances[msg.sender] += amount;
    }
}

