
pragma solidity ^0.4.24;

contract Ballot {
    mapping (uint => address[]) votes;
    
    function vote(uint nproposal) public returns(bool) {
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

