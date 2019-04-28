
contract Message {
    string public message;

    constructor(string memory _message) public {
        message = _message;
    }
    
    function setMessage(string memory _message) public {
        message = _message;
    }
}

