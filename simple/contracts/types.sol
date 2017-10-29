
contract Types {
    // signed integer (32 bytes)
    int signed;
    // unsigned integer (32 bytes)
    uint unsigned;
    // integer with bit size
    uint16 short;

    // boolean
    bool flag;

    // string
    string name;

    // address
    address wallet;
    // members: wallet.balance, 
    // wallet.transfer(uint256) throws on failure
    // wallet.send(uint256) returns(bool)
    // returns false on failure

    // visible state variable
    int public visible;

    // fixed size byte arrays
    bytes1 onebyte;
    bytes20 twentybytes;
    bytes32 thirtytwobytes;
    int[10] tenintegers;
    string[5] fivemessages;

    // dynamically-sized arrays
    bytes data;
    string message;

    // enums
    enum Actions { GoLeft, GoRight, GoStraight, SitStill }

    // dynamic array initialization
    function f(uint len) {
        uint[] memory a = new uint[](7);
        bytes memory b = new bytes(len);
        // Here we have a.length == 7 and b.length == len
        a[6] = 8;
    }
}