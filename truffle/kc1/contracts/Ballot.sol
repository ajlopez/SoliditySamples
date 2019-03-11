pragma solidity ^0.4.24;

contract Ballot {
    mapping (uint => address[]) votes;
    
    function vote(uint id) public {
        votes[id].push(msg.sender);
    }
    
    function noVotes(uint id) public view returns (uint) {
        return votes[id].length;
    }
}

