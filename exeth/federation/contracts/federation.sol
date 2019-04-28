
contract Federation {
    address[] federators;
	
    constructor(address[] memory feds) public {
        federators = feds;
    }
	
	function federationSize() public view returns (uint) {
		return federators.length;
	}
	
	function isFederator(address addr) public view returns(bool) {
		for (uint16 k; k < federators.length; k++)
			if (addr == federators[k])
				return true;
				
		return false;
	}
	
	function addFederator(address addr) public returns (bool) {
		if (isFederator(addr))
			return false;
			
		federators.push(addr);
		
		return true;
	}
}

