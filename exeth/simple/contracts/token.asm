
======= token.sol:Token =======
EVM assembly:
    /* "token.sol":31:697  contract Token { ... */
  mstore(0x40, 0x60)
    /* "token.sol":262:333  function Token() public {... */
  jumpi(tag_1, iszero(callvalue))
  0x0
  dup1
  revert
tag_1:
tag_2:
    /* "token.sol":320:325  10000 */
  0x2710
    /* "token.sol":297:305  balances */
  0x0
    /* "token.sol":297:317  balances[msg.sender] */
  dup1
    /* "token.sol":306:316  msg.sender */
  caller
    /* "token.sol":297:317  balances[msg.sender] */
  0xffffffffffffffffffffffffffffffffffffffff
  and
  0xffffffffffffffffffffffffffffffffffffffff
  and
  dup2
  mstore
  0x20
  add
  swap1
  dup2
  mstore
  0x20
  add
  0x0
  keccak256
    /* "token.sol":297:325  balances[msg.sender] = 10000 */
  dup2
  swap1
  sstore
  pop
    /* "token.sol":262:333  function Token() public {... */
tag_3:
    /* "token.sol":31:697  contract Token { ... */
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
        /* "token.sol":31:697  contract Token { ... */
      mstore(0x40, 0x60)
      calldataload(0x0)
      0x100000000000000000000000000000000000000000000000000000000
      swap1
      div
      0xffffffff
      and
      dup1
      0x27e235e3
      eq
      tag_2
      jumpi
      dup1
      0xa9059cbb
      eq
      tag_3
      jumpi
    tag_1:
      0x0
      dup1
      revert
        /* "token.sol":54:95  mapping (address => uint) public balances */
    tag_2:
      jumpi(tag_4, iszero(callvalue))
      0x0
      dup1
      revert
    tag_4:
      tag_5
      0x4
      dup1
      dup1
      calldataload
      0xffffffffffffffffffffffffffffffffffffffff
      and
      swap1
      0x20
      add
      swap1
      swap2
      swap1
      pop
      pop
      jump(tag_6)
    tag_5:
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
        /* "token.sol":379:694  function transfer(address receiver, uint amount) public returns(bool sufficient) {... */
    tag_3:
      jumpi(tag_7, iszero(callvalue))
      0x0
      dup1
      revert
    tag_7:
      tag_8
      0x4
      dup1
      dup1
      calldataload
      0xffffffffffffffffffffffffffffffffffffffff
      and
      swap1
      0x20
      add
      swap1
      swap2
      swap1
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
      jump(tag_9)
    tag_8:
      mload(0x40)
      dup1
      dup3
      iszero
      iszero
      iszero
      iszero
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
        /* "token.sol":54:95  mapping (address => uint) public balances */
    tag_6:
      mstore(0x20, 0x0)
      dup1
      0x0
      mstore
      keccak256(0x0, 0x40)
      0x0
      swap2
      pop
      swap1
      pop
      sload
      dup2
      jump	// out
        /* "token.sol":379:694  function transfer(address receiver, uint amount) public returns(bool sufficient) {... */
    tag_9:
        /* "token.sol":443:458  bool sufficient */
      0x0
        /* "token.sol":498:504  amount */
      dup2
        /* "token.sol":475:483  balances */
      0x0
        /* "token.sol":475:495  balances[msg.sender] */
      dup1
        /* "token.sol":484:494  msg.sender */
      caller
        /* "token.sol":475:495  balances[msg.sender] */
      0xffffffffffffffffffffffffffffffffffffffff
      and
      0xffffffffffffffffffffffffffffffffffffffff
      and
      dup2
      mstore
      0x20
      add
      swap1
      dup2
      mstore
      0x20
      add
      0x0
      keccak256
      sload
        /* "token.sol":475:504  balances[msg.sender] < amount */
      lt
        /* "token.sol":471:523  if (balances[msg.sender] < amount) ... */
      iszero
      tag_11
      jumpi
        /* "token.sol":518:523  false */
      0x0
        /* "token.sol":511:523  return false */
      swap1
      pop
      jump(tag_10)
        /* "token.sol":471:523  if (balances[msg.sender] < amount) ... */
    tag_11:
        /* "token.sol":562:568  amount */
      dup2
        /* "token.sol":538:546  balances */
      0x0
        /* "token.sol":538:558  balances[msg.sender] */
      dup1
        /* "token.sol":547:557  msg.sender */
      caller
        /* "token.sol":538:558  balances[msg.sender] */
      0xffffffffffffffffffffffffffffffffffffffff
      and
      0xffffffffffffffffffffffffffffffffffffffff
      and
      dup2
      mstore
      0x20
      add
      swap1
      dup2
      mstore
      0x20
      add
      0x0
      keccak256
      0x0
        /* "token.sol":538:568  balances[msg.sender] -= amount */
      dup3
      dup3
      sload
      sub
      swap3
      pop
      pop
      dup2
      swap1
      sstore
      pop
        /* "token.sol":601:607  amount */
      dup2
        /* "token.sol":579:587  balances */
      0x0
        /* "token.sol":579:597  balances[receiver] */
      dup1
        /* "token.sol":588:596  receiver */
      dup6
        /* "token.sol":579:597  balances[receiver] */
      0xffffffffffffffffffffffffffffffffffffffff
      and
      0xffffffffffffffffffffffffffffffffffffffff
      and
      dup2
      mstore
      0x20
      add
      swap1
      dup2
      mstore
      0x20
      add
      0x0
      keccak256
      0x0
        /* "token.sol":579:607  balances[receiver] += amount */
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
        /* "token.sol":622:660  Transfer(msg.sender, receiver, amount) */
      0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
        /* "token.sol":631:641  msg.sender */
      caller
        /* "token.sol":643:651  receiver */
      dup5
        /* "token.sol":653:659  amount */
      dup5
        /* "token.sol":622:660  Transfer(msg.sender, receiver, amount) */
      mload(0x40)
      dup1
      dup5
      0xffffffffffffffffffffffffffffffffffffffff
      and
      0xffffffffffffffffffffffffffffffffffffffff
      and
      dup2
      mstore
      0x20
      add
      dup4
      0xffffffffffffffffffffffffffffffffffffffff
      and
      0xffffffffffffffffffffffffffffffffffffffff
      and
      dup2
      mstore
      0x20
      add
      dup3
      dup2
      mstore
      0x20
      add
      swap4
      pop
      pop
      pop
      pop
      mload(0x40)
      dup1
      swap2
      sub
      swap1
      log1
        /* "token.sol":682:686  true */
      0x1
        /* "token.sol":675:686  return true */
      swap1
      pop
        /* "token.sol":379:694  function transfer(address receiver, uint amount) public returns(bool sufficient) {... */
    tag_10:
      swap3
      swap2
      pop
      pop
      jump	// out

    auxdata: 0xa165627a7a723058206eeb5ce99ecaedf1e1d69e2be9f2b6aff6498dc1892a8884a484b4dff65ce9730029
}
