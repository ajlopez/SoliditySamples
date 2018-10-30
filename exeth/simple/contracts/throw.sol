
pragma solidity ^0.4.24;

contract Throw {
	constructor() public payable {
		require(msg.value > 0);
	}
}

