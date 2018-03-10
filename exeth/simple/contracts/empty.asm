
======= empty.sol:Empty =======
EVM assembly:
    /* "empty.sol":59:78  contract Empty {... */
  mstore(0x40, 0x60)
  jumpi(tag_1, iszero(callvalue))
  0x0
  dup1
  revert
tag_1:
tag_2:
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "empty.sol":59:78  contract Empty {... */
      mstore(0x40, 0x60)
    tag_1:
      0x0
      dup1
      revert

    auxdata: 0xa165627a7a7230582046b5464930e5eb5db6027b5aaae7f9140430cdd322d5eb42de2e546521573bd90029
}
