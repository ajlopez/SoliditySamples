
contract Selector {
  function f() returns (bytes4) {
    return this.f.selector;
  }
}