var Ownable = artifacts.require("ownership/Ownable.sol");
var BasicToken = artifacts.require("token/BasicToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(BasicToken);
};
