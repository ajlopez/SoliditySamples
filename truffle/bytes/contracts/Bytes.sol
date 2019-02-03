pragma solidity ^0.4.24;

pragma experimental ABIEncoderV2;

contract Bytes {
    bytes[] public data;
    string[] public data2;
    
    function setData(bytes[] _data) public {
        data = _data;
    }
    
    function setData2(string[] _data2) public {
        data2 = _data2;
    }
    
    function getDataItem(uint position) public view returns (bytes) {
        return data[position];
    }
}