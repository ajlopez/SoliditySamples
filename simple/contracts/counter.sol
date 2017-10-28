
// Simple counter contract

contract Counter {
    uint counter;
	
    function Counter() {
        counter = 1;
    }
    
    function increment() {
        counter++;
    }
	
    function add(uint v) {
        counter += v;
    }
	
    function getCounver() constant returns (uint) {
        return counter;
    }
}

