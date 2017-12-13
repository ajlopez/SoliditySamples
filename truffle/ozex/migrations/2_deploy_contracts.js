var ExampleToken = artifacts.require("./ExampleToken.sol");

module.exports = function(deployer) {
  deployer.deploy(ExampleToken);
};
