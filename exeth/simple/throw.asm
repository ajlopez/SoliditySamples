
======= contracts\throw.sol:Throw =======
EVM assembly:
    /* "contracts\throw.sol":30:113  contract Throw {... */
  mstore(0x40, 0x80)
    /* "contracts\throw.sol":103:104  0 */
  0x0
    /* "contracts\throw.sol":91:100  msg.value */
  callvalue
    /* "contracts\throw.sol":91:104  msg.value > 0 */
  gt
    /* "contracts\throw.sol":83:105  require(msg.value > 0) */
  iszero
  iszero
  tag_3
  jumpi
  0x0
  dup1
  revert
tag_3:
    /* "contracts\throw.sol":30:113  contract Throw {... */
  dataSize(sub_0)
  dup1
  dataOffset(sub_0)
  0x0
  codecopy
  0x0
  return
stop

sub_0: assembly {
        /* "contracts\throw.sol":30:113  contract Throw {... */
      mstore(0x40, 0x80)
      0x0
      dup1
      revert

    auxdata: 0xa165627a7a7230582001af1ea8ad2939f535a571008abacdf9c657fe884c614c8000bdc2c9c45c168e0029
}

