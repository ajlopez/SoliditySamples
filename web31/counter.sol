
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
	
    function getCounter() constant returns (uint) {
        return counter;
    }
}

