
contract Bet {
	struct Bet {
		address payable account;
		string name;
		string result;
		uint amount;
	}
	
	mapping (string => Bet[]) betsByMatch;
	mapping (address => Bet[]) betsByAddress;
	
	function bet(string memory name, string memory result) public payable {
		Bet memory b = Bet(msg.sender, name, result, msg.value);
		betsByAddress[msg.sender].push(b);
		betsByMatch[name].push(b);
	}
	
	function getMatchAmount(string memory name) public view returns (uint) {
		uint result;
		
		Bet[] storage bets = betsByMatch[name];
		uint nbets = bets.length;
		
		for (uint k = 0; k < nbets; k++) {
			Bet storage b = bets[k];
			
			result += b.amount;
		}
		
		return result;
	}
	
	function getMatchAmount(string memory name, string memory result) public view returns (uint) {
		uint amount;
		
		Bet[] storage bets = betsByMatch[name];
		uint nbets = bets.length;
		bytes32 kresult = keccak256(abi.encodePacked(result));
		
		for (uint k = 0; k < nbets; k++) {
			Bet storage b = bets[k];
			
			if (keccak256(abi.encodePacked(b.result)) != kresult)
				continue;
			
			amount += b.amount;
		}
		
		return amount;
	}
	
	function resolve(string memory name, string memory result) public {
		uint total = getMatchAmount(name);
		uint winners = getMatchAmount(name, result);
		
		bytes32 kresult = keccak256(abi.encodePacked(result));
		
		if (winners > 0) {
			uint factor = total / winners;
			
			Bet[] storage bets = betsByMatch[name];
			uint nbets = bets.length;
			
			for (uint k = 0; k < nbets; k++) {
				Bet storage b = bets[k];
				
				if (keccak256(abi.encodePacked(b.result)) != kresult)
					continue;
					
				b.account.transfer(factor * b.amount);
			}
		}
		
		betsByMatch[name].length = 0;
		
		return;
	}
	
	function getAddressAmount(address from, string memory name) public view returns (uint) {
		uint result;
		Bet[] storage bs = betsByAddress[from];
		uint nbs = bs.length;
		bytes32 kname = keccak256(abi.encodePacked(name));
		
		for (uint k = 0; k < nbs; k++) {
			Bet storage b = bs[k];
			
			if (keccak256(abi.encodePacked(b.name)) != kname)
				continue;
				
			result += b.amount;
		}
			
		return result;
	}
}

