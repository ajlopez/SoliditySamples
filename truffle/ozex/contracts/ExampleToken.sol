pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/token/StandardToken.sol";

contract ExampleToken is StandardToken {
	string public name = "ExampleToken"; 
	string public symbol = "EGT";
	uint public decimals = 18;
	uint public INITIAL_SUPPLY = 10000;

	function ExampleToken() {
		totalSupply = INITIAL_SUPPLY;
		balances[msg.sender] = INITIAL_SUPPLY;
	}
} 
 