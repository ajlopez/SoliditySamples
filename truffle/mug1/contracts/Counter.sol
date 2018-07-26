
contract Counter {
	uint public counter;
	
	function increment() public {
		counter++;
	}
	
	function add(uint value) public {
		counter += value;
	}
	
	function process(bytes data) public {
		
	}
	
	function add(uint value, uint value2) public {
		counter += value + value2;
	}
}