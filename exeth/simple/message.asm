
======= contracts\message.sol:Message =======
EVM assembly:
    /* "contracts\message.sol":2:196  contract Message {... */
  mstore(0x40, 0x80)
    /* "contracts\message.sol":56:117  function Message(string msg) {... */
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
    /* "contracts\message.sol":56:117  function Message(string msg) {... */
  pop
  mload(0x40)
  sub(codesize, bytecodeSize)
  dup1
  bytecodeSize
  dup4
  codecopy
  dup2
  add
  dup1
  0x40
  mstore
  dup2
  add
  swap1
  dup1
  dup1
  mload
  dup3
  add
  swap3
  swap2
  swap1
  pop
  pop
  pop
    /* "contracts\message.sol":106:109  msg */
  dup1
    /* "contracts\message.sol":96:103  message */
  0x0
    /* "contracts\message.sol":96:109  message = msg */
  swap1
  dup1
  mload
  swap1
  0x20
  add
  swap1
  tag_4
  swap3
  swap2
  swap1
  jump	// in(tag_5)
tag_4:
  pop
    /* "contracts\message.sol":56:117  function Message(string msg) {... */
  pop
    /* "contracts\message.sol":2:196  contract Message {... */
  jump(tag_6)
tag_5:
  dup3
  dup1
  sload
  0x1
  dup2
  0x1
  and
  iszero
  0x100
  mul
  sub
  and
  0x2
  swap1
  div
  swap1
  0x0
  mstore
  keccak256(0x0, 0x20)
  swap1
  0x1f
  add
  0x20
  swap1
  div
  dup2
  add
  swap3
  dup3
  0x1f
  lt
  tag_8
  jumpi
  dup1
  mload
  not(0xff)
  and
  dup4
  dup1
  add
  or
  dup6
  sstore
  jump(tag_7)
tag_8:
  dup3
  dup1
  add
  0x1
  add
  dup6
  sstore
  dup3
  iszero
  tag_7
  jumpi
  swap2
  dup3
  add
tag_9:
  dup3
  dup2
  gt
  iszero
  tag_10
  jumpi
  dup3
  mload
  dup3
  sstore
  swap2
  0x20
  add
  swap2
  swap1
  0x1
  add
  swap1
  jump(tag_9)
tag_10:
tag_7:
  pop
  swap1
  pop
  tag_11
  swap2
  swap1
  jump	// in(tag_12)
tag_11:
  pop
  swap1
  jump	// out
tag_12:
  tag_13
  swap2
  swap1
tag_14:
  dup1
  dup3
  gt
  iszero
  tag_15
  jumpi
  0x0
  dup2
  0x0
  swap1
  sstore
  pop
  0x1
  add
  jump(tag_14)
tag_15:
  pop
  swap1
  jump
tag_13:
  swap1
  jump	// out
tag_6:
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "contracts\message.sol":2:196  contract Message {... */
      mstore(0x40, 0x80)
      jumpi(tag_1, lt(calldatasize, 0x4))
      calldataload(0x0)
      0x100000000000000000000000000000000000000000000000000000000
      swap1
      div
      0xffffffff
      and
      dup1
      0x368b8772
      eq
      tag_2
      jumpi
      dup1
      0xe21f37ce
      eq
      tag_3
      jumpi
    tag_1:
      0x0
      dup1
      revert
        /* "contracts\message.sol":129:193  function setMessage(string msg) {... */
    tag_2:
      callvalue
        /* "--CODEGEN--":8:17   */
      dup1
        /* "--CODEGEN--":5:7   */
      iszero
      tag_4
      jumpi
        /* "--CODEGEN--":30:31   */
      0x0
        /* "--CODEGEN--":27:28   */
      dup1
        /* "--CODEGEN--":20:32   */
      revert
        /* "--CODEGEN--":5:7   */
    tag_4:
        /* "contracts\message.sol":129:193  function setMessage(string msg) {... */
      pop
      tag_5
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
      dup3
      add
      dup1
      calldataload
      swap1
      0x20
      add
      swap1
      dup1
      dup1
      0x1f
      add
      0x20
      dup1
      swap2
      div
      mul
      0x20
      add
      mload(0x40)
      swap1
      dup2
      add
      0x40
      mstore
      dup1
      swap4
      swap3
      swap2
      swap1
      dup2
      dup2
      mstore
      0x20
      add
      dup4
      dup4
      dup1
      dup3
      dup5
      calldatacopy
      dup3
      add
      swap2
      pop
      pop
      pop
      pop
      pop
      pop
      swap2
      swap3
      swap2
      swap3
      swap1
      pop
      pop
      pop
      jump(tag_6)
    tag_5:
      stop
        /* "contracts\message.sol":26:47  string public message */
    tag_3:
      callvalue
        /* "--CODEGEN--":8:17   */
      dup1
        /* "--CODEGEN--":5:7   */
      iszero
      tag_7
      jumpi
        /* "--CODEGEN--":30:31   */
      0x0
        /* "--CODEGEN--":27:28   */
      dup1
        /* "--CODEGEN--":20:32   */
      revert
        /* "--CODEGEN--":5:7   */
    tag_7:
        /* "contracts\message.sol":26:47  string public message */
      pop
      tag_8
      jump(tag_9)
    tag_8:
      mload(0x40)
      dup1
      dup1
      0x20
      add
      dup3
      dup2
      sub
      dup3
      mstore
      dup4
      dup2
      dup2
      mload
      dup2
      mstore
      0x20
      add
      swap2
      pop
      dup1
      mload
      swap1
      0x20
      add
      swap1
      dup1
      dup4
      dup4
        /* "--CODEGEN--":23:24   */
      0x0
        /* "--CODEGEN--":8:108   */
    tag_10:
        /* "--CODEGEN--":33:36   */
      dup4
        /* "--CODEGEN--":30:31   */
      dup2
        /* "--CODEGEN--":27:37   */
      lt
        /* "--CODEGEN--":8:108   */
      iszero
      tag_11
      jumpi
        /* "--CODEGEN--":99:100   */
      dup1
        /* "--CODEGEN--":94:97   */
      dup3
        /* "--CODEGEN--":90:101   */
      add
        /* "--CODEGEN--":84:102   */
      mload
        /* "--CODEGEN--":80:81   */
      dup2
        /* "--CODEGEN--":75:78   */
      dup5
        /* "--CODEGEN--":71:82   */
      add
        /* "--CODEGEN--":64:103   */
      mstore
        /* "--CODEGEN--":52:54   */
      0x20
        /* "--CODEGEN--":49:50   */
      dup2
        /* "--CODEGEN--":45:55   */
      add
        /* "--CODEGEN--":40:55   */
      swap1
      pop
        /* "--CODEGEN--":8:108   */
      jump(tag_10)
    tag_11:
        /* "--CODEGEN--":12:26   */
      pop
        /* "contracts\message.sol":26:47  string public message */
      pop
      pop
      pop
      swap1
      pop
      swap1
      dup2
      add
      swap1
      0x1f
      and
      dup1
      iszero
      tag_13
      jumpi
      dup1
      dup3
      sub
      dup1
      mload
      0x1
      dup4
      0x20
      sub
      0x100
      exp
      sub
      not
      and
      dup2
      mstore
      0x20
      add
      swap2
      pop
    tag_13:
      pop
      swap3
      pop
      pop
      pop
      mload(0x40)
      dup1
      swap2
      sub
      swap1
      return
        /* "contracts\message.sol":129:193  function setMessage(string msg) {... */
    tag_6:
        /* "contracts\message.sol":182:185  msg */
      dup1
        /* "contracts\message.sol":172:179  message */
      0x0
        /* "contracts\message.sol":172:185  message = msg */
      swap1
      dup1
      mload
      swap1
      0x20
      add
      swap1
      tag_15
      swap3
      swap2
      swap1
      jump	// in(tag_16)
    tag_15:
      pop
        /* "contracts\message.sol":129:193  function setMessage(string msg) {... */
      pop
      jump	// out
        /* "contracts\message.sol":26:47  string public message */
    tag_9:
      0x0
      dup1
      sload
      0x1
      dup2
      0x1
      and
      iszero
      0x100
      mul
      sub
      and
      0x2
      swap1
      div
      dup1
      0x1f
      add
      0x20
      dup1
      swap2
      div
      mul
      0x20
      add
      mload(0x40)
      swap1
      dup2
      add
      0x40
      mstore
      dup1
      swap3
      swap2
      swap1
      dup2
      dup2
      mstore
      0x20
      add
      dup3
      dup1
      sload
      0x1
      dup2
      0x1
      and
      iszero
      0x100
      mul
      sub
      and
      0x2
      swap1
      div
      dup1
      iszero
      tag_17
      jumpi
      dup1
      0x1f
      lt
      tag_18
      jumpi
      0x100
      dup1
      dup4
      sload
      div
      mul
      dup4
      mstore
      swap2
      0x20
      add
      swap2
      jump(tag_17)
    tag_18:
      dup3
      add
      swap2
      swap1
      0x0
      mstore
      keccak256(0x0, 0x20)
      swap1
    tag_19:
      dup2
      sload
      dup2
      mstore
      swap1
      0x1
      add
      swap1
      0x20
      add
      dup1
      dup4
      gt
      tag_19
      jumpi
      dup3
      swap1
      sub
      0x1f
      and
      dup3
      add
      swap2
    tag_17:
      pop
      pop
      pop
      pop
      pop
      dup2
      jump	// out
        /* "contracts\message.sol":2:196  contract Message {... */
    tag_16:
      dup3
      dup1
      sload
      0x1
      dup2
      0x1
      and
      iszero
      0x100
      mul
      sub
      and
      0x2
      swap1
      div
      swap1
      0x0
      mstore
      keccak256(0x0, 0x20)
      swap1
      0x1f
      add
      0x20
      swap1
      div
      dup2
      add
      swap3
      dup3
      0x1f
      lt
      tag_21
      jumpi
      dup1
      mload
      not(0xff)
      and
      dup4
      dup1
      add
      or
      dup6
      sstore
      jump(tag_20)
    tag_21:
      dup3
      dup1
      add
      0x1
      add
      dup6
      sstore
      dup3
      iszero
      tag_20
      jumpi
      swap2
      dup3
      add
    tag_22:
      dup3
      dup2
      gt
      iszero
      tag_23
      jumpi
      dup3
      mload
      dup3
      sstore
      swap2
      0x20
      add
      swap2
      swap1
      0x1
      add
      swap1
      jump(tag_22)
    tag_23:
    tag_20:
      pop
      swap1
      pop
      tag_24
      swap2
      swap1
      jump	// in(tag_25)
    tag_24:
      pop
      swap1
      jump	// out
    tag_25:
      tag_26
      swap2
      swap1
    tag_27:
      dup1
      dup3
      gt
      iszero
      tag_28
      jumpi
      0x0
      dup2
      0x0
      swap1
      sstore
      pop
      0x1
      add
      jump(tag_27)
    tag_28:
      pop
      swap1
      jump
    tag_26:
      swap1
      jump	// out

    auxdata: 0xa165627a7a72305820e03c25ab4a1f58f0fa5f926557aa4832eb7b47fcefdb8b6c138b44c3ac029dcb0029
}

