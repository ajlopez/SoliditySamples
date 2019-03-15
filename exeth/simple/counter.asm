
======= contracts\counter.sol:Counter =======
EVM assembly:
    /* "contracts\counter.sol":60:427  contract Counter {... */
  mstore(0x40, 0x80)
    /* "contracts\counter.sol":142:193  constructor() public {... */
  callvalue
    /* "--CODEGEN--":8:17   */
  dup1
    /* "--CODEGEN--":5:7   */
  iszero
  tag_1
  jumpi
    /* "--CODEGEN--":30:31   */
  0x0
    /* "--CODEGEN--":27:28   */
  dup1
    /* "--CODEGEN--":20:32   */
  revert
    /* "--CODEGEN--":5:7   */
tag_1:
    /* "contracts\counter.sol":142:193  constructor() public {... */
  pop
    /* "contracts\counter.sol":184:185  1 */
  0x1
    /* "contracts\counter.sol":174:181  counter */
  0x0
    /* "contracts\counter.sol":174:185  counter = 1 */
  dup2
  swap1
  sstore
  pop
    /* "contracts\counter.sol":60:427  contract Counter {... */
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "contracts\counter.sol":60:427  contract Counter {... */
      mstore(0x40, 0x80)
      jumpi(tag_1, lt(calldatasize, 0x4))
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
        /* "contracts\counter.sol":270:329  function add(uint v) public {... */
    tag_2:
      callvalue
        /* "--CODEGEN--":8:17   */
      dup1
        /* "--CODEGEN--":5:7   */
      iszero
      tag_5
      jumpi
        /* "--CODEGEN--":30:31   */
      0x0
        /* "--CODEGEN--":27:28   */
      dup1
        /* "--CODEGEN--":20:32   */
      revert
        /* "--CODEGEN--":5:7   */
    tag_5:
        /* "contracts\counter.sol":270:329  function add(uint v) public {... */
      pop
      tag_6
      0x4
      dup1
      calldatasize
      sub
      dup2
      add
      swap1
      dup1
      dup1
      calldataload
      swap1
      0x20
      add
      swap1
      swap3
      swap2
      swap1
      pop
      pop
      pop
      jump(tag_7)
    tag_6:
      stop
        /* "contracts\counter.sol":338:424  function getCounter() public constant returns (uint) {... */
    tag_3:
      callvalue
        /* "--CODEGEN--":8:17   */
      dup1
        /* "--CODEGEN--":5:7   */
      iszero
      tag_8
      jumpi
        /* "--CODEGEN--":30:31   */
      0x0
        /* "--CODEGEN--":27:28   */
      dup1
        /* "--CODEGEN--":20:32   */
      revert
        /* "--CODEGEN--":5:7   */
    tag_8:
        /* "contracts\counter.sol":338:424  function getCounter() public constant returns (uint) {... */
      pop
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
        /* "contracts\counter.sol":205:261  function increment() public {... */
    tag_4:
      callvalue
        /* "--CODEGEN--":8:17   */
      dup1
        /* "--CODEGEN--":5:7   */
      iszero
      tag_11
      jumpi
        /* "--CODEGEN--":30:31   */
      0x0
        /* "--CODEGEN--":27:28   */
      dup1
        /* "--CODEGEN--":20:32   */
      revert
        /* "--CODEGEN--":5:7   */
    tag_11:
        /* "contracts\counter.sol":205:261  function increment() public {... */
      pop
      tag_12
      jump(tag_13)
    tag_12:
      stop
        /* "contracts\counter.sol":270:329  function add(uint v) public {... */
    tag_7:
        /* "contracts\counter.sol":320:321  v */
      dup1
        /* "contracts\counter.sol":309:316  counter */
      0x0
      dup1
        /* "contracts\counter.sol":309:321  counter += v */
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
        /* "contracts\counter.sol":270:329  function add(uint v) public {... */
      pop
      jump	// out
        /* "contracts\counter.sol":338:424  function getCounter() public constant returns (uint) {... */
    tag_10:
        /* "contracts\counter.sol":385:389  uint */
      0x0
        /* "contracts\counter.sol":409:416  counter */
      dup1
      sload
        /* "contracts\counter.sol":402:416  return counter */
      swap1
      pop
        /* "contracts\counter.sol":338:424  function getCounter() public constant returns (uint) {... */
      swap1
      jump	// out
        /* "contracts\counter.sol":205:261  function increment() public {... */
    tag_13:
        /* "contracts\counter.sol":244:251  counter */
      0x0
      dup1
        /* "contracts\counter.sol":244:253  counter++ */
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
        /* "contracts\counter.sol":205:261  function increment() public {... */
      jump	// out

    auxdata: 0xa165627a7a72305820232668abccc49488e7242ef09e8eda18a382d76e76fa69d605baca1e6042d6ae0029
}

