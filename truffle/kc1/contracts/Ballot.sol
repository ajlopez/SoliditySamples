pragma solidity ^0.4.24;

contract Ballot {
    mapping (uint => address[]) public votes;
    address[] public members;
    
    constructor(address[] _members) public {
        members = _members;
    }
    
    function isMember(address user) private view returns (bool) {
        for (uint k = 0; k < members.length; k++)
            if (user == members[k])
                return true;
                
        return false;
    }
    
    modifier onlyMember() {
        require(isMember(msg.sender));
        _;        
    }
    
    function vote(uint id) public onlyMember() {
        address[] storage vts = votes[id];
        
        for (uint k = 0; k < vts.length; k++)
            if (vts[k] == msg.sender)
                return;
                
        vts.push(msg.sender);
    }
    
    function noVotes(uint id) public view returns (uint) {
        return votes[id].length;
    }
}

    