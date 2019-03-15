
contract Counter {
    uint x;

    event Incremented(bool indexed odd, uint x);
	event Created(uint x);
	event Valued(uint x);
	
    constructor() public {
        x = 70;
		emit Created(x);
    }
    
    function increment() public {
        ++x;
        emit Incremented(x % 2 == 1, x);
    }
	
    function getValue() public view returns (uint) {
		// emit Valued(x);
        return x;
    }
}

contract Creator {
	Counter public counter;
	event CounterCreated(uint);
	
	constructor() public {
		counter = new Counter();
		emit CounterCreated(counter.getValue());
	}
}

