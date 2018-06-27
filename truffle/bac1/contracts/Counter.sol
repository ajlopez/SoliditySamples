
contract Counter {
	uint public counter;
	
	function increment() public {
		counter++;
	}
	
	function add(uint v) public {
		counter += v;
	}
}


