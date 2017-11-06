
contract Greeter {
    string public message;

    function Greeter() {
        message = "Hello, Contract";
    }
    
    function setMessage(string msg) {
        message = msg;
    }
}

