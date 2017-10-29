
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

    // dynamically-sized arrays
    bytes data;
    string message;

    // enums
    enum Actions { GoLeft, GoRight, GoStraight, SitStill }
}