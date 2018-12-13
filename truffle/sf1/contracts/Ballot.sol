pragma solidity ^0.4.24;

contract Ballot {
    mapping (bytes32 => address[]) public votes;
    address[] voters;
    
    constructor(address[] _voters) public {
        voters = _voters;
    }
    
    modifier onlyVoters() {
        for (uint k = 0; k < voters.length; k++)
            if (msg.sender == voters[k]) {
                _;
                return;
            }
            
        revert();
    }
    
    function vote(bytes32 id) public onlyVoters {
        for (uint k = 0; k < votes[id].length; k++)
            if (votes[id][k] == msg.sender)
                revert();
                
        votes[id].push(msg.sender);
    }
    
    function noVotes(bytes32 id) public view returns (uint) {
        return votes[id].length;
    }
    
    function getVoters(bytes32 id) public view returns (address[]) {
        return votes[id];
    }
}
