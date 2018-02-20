
======= contracts\counter.sol:Counter =======
EVM assembly:
    /* "contracts\counter.sol":63:399  contract Counter {... */
  mstore(0x40, 0x60)
    /* "contracts\counter.sol":109:165  function Counter() public {... */
  jumpi(tag_1, iszero(callvalue))
  0x0
  dup1
  revert
tag_1:
tag_2:
    /* "contracts\counter.sol":156:157  1 */
  0x1
    /* "contracts\counter.sol":146:153  counter */
  0x0
    /* "contracts\counter.sol":146:157  counter = 1 */
  dup2
  swap1
  sstore
  pop
    /* "contracts\counter.sol":109:165  function Counter() public {... */
tag_3:
    /* "contracts\counter.sol":63:399  contract Counter {... */
tag_4:
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "contracts\counter.sol":63:399  contract Counter {... */
      mstore(0x40, 0x60)
      calldataload(0x0)
      0x100000000000000000000000000000000000000000000000000000000
      swap1
      div
      0xffffffff
      and
      dup1
      0x1003e2d2
      eq
      tag_2
      jumpi
      dup1
      0x8ada066e
      eq
      tag_3
      jumpi
      dup1
      0xd09de08a
      eq
      tag_4
      jumpi
    tag_1:
      0x0
      dup1
      revert
        /* "contracts\counter.sol":242:301  function add(uint v) public {... */
    tag_2:
      jumpi(tag_5, iszero(callvalue))
      0x0
      dup1
      revert
    tag_5:
      tag_6
      0x4
      dup1
      dup1
      calldataload
      swap1
      0x20
      add
      swap1
      swap2
      swap1
      pop
      pop
      jump(tag_7)
    tag_6:
      stop
        /* "contracts\counter.sol":310:396  function getCounter() public constant returns (uint) {... */
    tag_3:
      jumpi(tag_8, iszero(callvalue))
      0x0
      dup1
      revert
    tag_8:
      tag_9
      jump(tag_10)
    tag_9:
      mload(0x40)
      dup1
      dup3
      dup2
      mstore
      0x20
      add
      swap2
      pop
      pop
      mload(0x40)
      dup1
      swap2
      sub
      swap1
      return
        /* "contracts\counter.sol":177:233  function increment() public {... */
    tag_4:
      jumpi(tag_11, iszero(callvalue))
      0x0
      dup1
      revert
    tag_11:
      tag_12
      jump(tag_13)
    tag_12:
      stop
        /* "contracts\counter.sol":242:301  function add(uint v) public {... */
    tag_7:
        /* "contracts\counter.sol":292:293  v */
      dup1
        /* "contracts\counter.sol":281:288  counter */
      0x0
      dup1
        /* "contracts\counter.sol":281:293  counter += v */
      dup3
      dup3
      sload
      add
      swap3
      pop
      pop
      dup2
      swap1
      sstore
      pop
        /* "contracts\counter.sol":242:301  function add(uint v) public {... */
    tag_14:
      pop
      jump	// out
        /* "contracts\counter.sol":310:396  function getCounter() public constant returns (uint) {... */
    tag_10:
        /* "contracts\counter.sol":357:361  uint */
      0x0
        /* "contracts\counter.sol":381:388  counter */
      dup1
      sload
        /* "contracts\counter.sol":374:388  return counter */
      swap1
      pop
        /* "contracts\counter.sol":310:396  function getCounter() public constant returns (uint) {... */
    tag_15:
      swap1
      jump	// out
        /* "contracts\counter.sol":177:233  function increment() public {... */
    tag_13:
        /* "contracts\counter.sol":216:223  counter */
      0x0
      dup1
        /* "contracts\counter.sol":216:225  counter++ */
      dup2
      sload
      dup1
      swap3
      swap2
      swap1
      0x1
      add
      swap2
      swap1
      pop
      sstore
      pop
        /* "contracts\counter.sol":177:233  function increment() public {... */
    tag_16:
      jump	// out

    auxdata: 0xa165627a7a72305820ce1256d578d3a616ce794b4e657934308050c723323cd4054e711e36e22d652d0029
}
