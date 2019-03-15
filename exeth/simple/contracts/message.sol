
contract Message {
    string public message;

    constructor(string msg) public {
        message = msg;
    }
    
    function setMessage(string msg) public {
        message = msg;
    }
}

