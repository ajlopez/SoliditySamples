
pragma solidity ^0.4.24;

contract Ballot {
    mapping (address => bool) canVote;
    mapping (uint => address[]) votes;
    
    modifier onlyVoter() {
        if (canVote[msg.sender])
            _;
    }
    
    constructor(address[] _voters) public {
        for (uint k = 0; k < _voters.length; k++)
            canVote[_voters[k]] = true;
    }
    
    function vote(uint nproposal) public onlyVoter returns(bool) {
        address[] storage pvotes = votes[nproposal];
        
        for (uint k = 0; k < pvotes.length; k++)
            if (pvotes[k] == msg.sender)
                return false;
                    
        pvotes.push(msg.sender);
        
        return true;
    }
    
    function noVotes(uint nproposal) public view returns (uint) {
        return votes[nproposal].length;
    }
    
    function getVotes(uint nproposal) public view returns (address[]) {
        return votes[nproposal];
    }
}

