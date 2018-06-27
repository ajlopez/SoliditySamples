var Counter = artifacts.require("./Counter.sol");

module.exports = function(deployer) {
  deployer.deploy(Counter);
};
