var Empty = artifacts.require("./Empty.sol");
var Counter = artifacts.require("./Counter.sol");

module.exports = function(deployer) {
  deployer.deploy(Empty);
  deployer.deploy(Counter, 1);
};

