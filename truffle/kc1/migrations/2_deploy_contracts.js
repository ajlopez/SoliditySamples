var Empty = artifacts.require("Empty");
var Counter = artifacts.require("Counter");

module.exports = function(deployer) {
    deployer.deploy(Empty);
    deployer.deploy(Counter);
};

