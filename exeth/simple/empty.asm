
======= contracts\empty.sol:Empty =======
EVM assembly:
    /* "contracts\empty.sol":59:78  contract Empty {... */
  mstore(0x40, 0x80)
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
    /* "contracts\empty.sol":59:78  contract Empty {... */
  pop
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "contracts\empty.sol":59:78  contract Empty {... */
      mstore(0x40, 0x80)
      0x0
      dup1
      revert

    auxdata: 0xa165627a7a723058202f1c75eb7aea0ee9d964a7e9f1de904b4c16148a4c7ad3ef482ced7b6d1328fd0029
}

