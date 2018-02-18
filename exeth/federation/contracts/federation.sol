
contract Federation {
    address[] federators;
	
    function Federation(address[] feds) public {
        federators = feds;
    }
	
	function federationSize() constant public returns (uint) {
		return federators.length;
	}
	
	function isFederator(address addr) constant public returns(bool) {
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

