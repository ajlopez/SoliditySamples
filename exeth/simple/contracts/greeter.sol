
contract Greeter {
    string public message;

    constructor() public {
        message = "Hello, Contract";
    }
    
    function setMessage(string memory msg) public {
        message = msg;
    }
}

